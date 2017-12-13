/*
 Elizabeth Reed and Ariel Todoki
 CS 445 Graphics
 Lab 8 (Final) - The A-Maze-ing Race
Due: December 14, 2017
 
 3D game in which the user controls Bb8 to navigate through a series of 2 mazes,
the second being bigger (and therefore more difficult) than the first. The mazes
are connected by stairs, and the user has 6 minutes to complete them both.
There is an option to use the birds eye view (easy) or not.

The mazes are procedurally generated using the recursive backtracking algorithm
and are different everytime you refresh the page.
 */

var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices 
var vColor;       // shader variable attrib location for color
var vNormal;
var vTexCoords;
var uColor;       // shader uniform variable location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var uTexture;
var thetaX = 0; //for rotating the pedals of unicycle and sphere
var distance = 2 * Math.PI * thetaX / 360; //moving ovjects independently
var distance2 = 2 * Math.PI * thetaX / 360;

var camera = new Camera();
var stack = new MatrixStack();
var light = new Lighting();
var timer = new Timer();
var hasTime = true;

//Texture variables
var checkerboard;
var verticalBands;
var softBands;
var gradient;
var imageTexture;
var imageTexture2;
var stripes;

var lightAngle = 0;

var program;

// orthographic projection parameters
var orthoL = -15;
var orthoR = 15;
var orthoB = -15;
var orthoT = 15;

var thetaR = 0;
var bb8Loc = vec4(0, 1, 10, 1);

var stair_offset = ((Shapes.maze.mazegen.gridSize - 1) / -2) + Shapes.maze.mazegen.startRow;
var offsetz = -(((Shapes.maze2.size + 1) / 2) + ((Shapes.maze.size + 1) / 2) + Shapes.stair.run);
var offsetx = ((Shapes.maze2.mazegen.gridSize - 1) / -2) + Shapes.maze2.mazegen.startRow - stair_offset;

//finish line z location
var xEnd = offsetx;
var yEnd = Shapes.stair.rise;
var zEnd = 2 * (Shapes.maze.size + 1) + 2 * (Shapes.maze2.size + 1) + Shapes.stair.run;

window.onload = function init()
{
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.361, 0.541, 0.541, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();

    Shapes.initShapes();  // create the primitive and other shapes  

    checkerboard = new Checkerboard();
    verticalBands = new VerticalBands();
    softBands = new SoftBands();
    gradient = new Gradient();
    headTexture = new ImageTexture("textures/bb8_head.jpg"); //head
    bodyTexture2 = new ImageTexture("textures/bbb81.png"); //body
    stripes = new Stripes();

    light.movePos(bb8Loc);
    light.setUp();

    render();

};

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
    // colors but we keep it in for possible use later.
    vNormal = gl.getAttribLocation(program, "vNormal");
    vTexCoords = gl.getAttribLocation(program, "vTexCoords");

    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix
    uTexture = gl.getUniformLocation(program, "uTexture");
    uColorMode = gl.getUniformLocation(program, "uColorMode");
}

//function sliderEventHandler(value) {
//    lightAngle = value;
//    render();
//}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Left half of viewport
    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    var viewMat = camera.calcViewMat();   // View matrix
    gl.viewport(0, 0, canvas.width / 2, canvas.height); //x,y,width,height
    render1(viewMat);

    // Right half of viewport
//    var position1 = lookAt(vec3(0, 20, 0), vec3(0, 0, 0), vec3(0, 0, -1)); //level one
    var followPosition = lookAt(vec3(bb8Loc[0], bb8Loc[1] + 20, bb8Loc[2] - 7), vec3(bb8Loc[0], 0, bb8Loc[2] - 7), vec3(0, 0, -1));

    // Change orthogonal view parameters for maze2
    if (bb8Loc[1] >= Shapes.stair.rise) {
        orthoL = -30;
        orthoR = 30;
        orthoB = -30;
        orthoT = 30;
    }

    projMat = ortho(orthoL, orthoR, orthoB, orthoT, 1, 1000); //ortho(left,right,bottom,top,near,far)
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

//    if(bb8Loc)
    viewMat = followPosition; // lookAt(eye,at,up)
    gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    render1(viewMat);

}

function render1(vm) {

    //////////
    var newLightPos = mult(vm, mult(rotateY(lightAngle), light.light_position));
    gl.uniform4fv(uLight_position, newLightPos);
    /////////
    stack.clear();

    stack.multiply(vm);

    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));

    if (!hasTime) { //when it runs out of time, you lose
        light.ka = 0;
        light.kd = 0;
        light.ks = 0;
        light.shininess = 50.0;
        light.setUp();
        document.getElementById("status").innerHTML = "Status: Game Over";
    }

    //if you win
    var onLevel2 = Math.round(bb8Loc[1]) >= Shapes.stair.rise; //has reached level 2
//    var solved2 = Math.round(bb8Loc[0] / 2) == stair_offset && Math.round(-bb8Loc[2]) > zEnd;
    var solved2 = -bb8Loc[2] > zEnd + 0.5;
    var reachedEnd = onLevel2 && solved2;
//    console.log("end = " + xEnd + "," + yEnd + ", " + zEnd);
    console.log(reachedEnd);

    if (hasTime && reachedEnd) { //if you win
        //make lights bright
        light.ka = 1;
        light.ka = 1;
        light.ks = 1;
        light.setUp();
        document.getElementById("status").innerHTML = "Status: You Win";
    }
    //draw scene
    stack.push();
    drawScene();
    stack.pop();
}

function drawScene() {
    //bb8
    stack.push();
    var bb8 = new Bb8();
    stack.multiply(translate(bb8Loc[0], bb8Loc[1] - 0.75, bb8Loc[2]));
    stack.multiply(scalem(0.1, 0.1, 0.1));
    bb8.drawBb8();
    stack.pop();

    //draw maze
    stack.push();
    stack.multiply(scalem(2, 1, 2)); //makes maze bigger, easier to navigate through
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.maze.drawMaze();
    stack.pop();

    //stairs
    stack.push();
    stack.multiply(scalem(2, 1, 2));
    stack.multiply(translate(stair_offset, 0, 0)); //starts start at the finish of first maze
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.stair.drawSteps();
    stack.pop();

    //level 2    
    stack.push();
    stack.multiply(scalem(2, 1, 2));
    stack.multiply(translate(-offsetx, Shapes.stair.rise - 0.5, offsetz));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.maze2.drawMaze(); //need to change so that the two mazes are different
    stack.pop();

    //when you reach the end of level 2
    stack.push();
    stack.multiply(scalem(1, 5, 1));
    stack.multiply(translate(stair_offset,1,-zEnd - 2));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 0);
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();
}
