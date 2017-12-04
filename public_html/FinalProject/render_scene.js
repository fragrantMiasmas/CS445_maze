/*
 Elizabeth Reed and Ariel Todoki
 CS 445 Graphics
 Lab 8 (Final) - The A-Maze-ing Race

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
var orthoL = -30;
var orthoR = 30;
var orthoB = -30;
var orthoT = 30;

var thetaR = 0;

var bb8Loc = vec4(0, 1, 10,1);

window.onload = function init()
{
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
//    rotY();

    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.309, 0.505, 0.74, 1.0);

    gl.enable(gl.DEPTH_TEST);

    shaderSetup();

    Shapes.initShapes();  // create the primitive and other shapes  

    checkerboard = new Checkerboard();
    verticalBands = new VerticalBands();
    softBands = new SoftBands();
    gradient = new Gradient();
    headTexture = new ImageTexture("textures/bb8_head.jpg"); //head
    bodyTexture2 = new ImageTexture("textures/bbb81.png"); //body
//     bodyTexture2 = new Checkerboard(); //body
    stripes = new Stripes();

    light.positionY(0);
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

function sliderEventHandler(value) {
    lightAngle = value;
    render();
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //Left half of viewport
    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    var viewMat = camera.calcViewMat();   // View matrix
    gl.viewport(0, 0, canvas.width / 2, canvas.height); //x,y,width,height
    render1(viewMat);

    //Right half of viewport
    projMat = ortho(orthoL, orthoR, orthoB, orthoT, 1, 1000); //ortho(left,right,bottom,top,near,far)
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    viewMat = lookAt(vec3(0, 20, 0), vec3(0, 0, 0), vec3(0, 0, -1)); // lookAt(eye,at,up)
    gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    render1(viewMat);

}

function render1(vm) {

    //////////
    var newLightPos = mult(vm, mult(rotateY(lightAngle), light.light_position));
    gl.uniform4fv(uLight_position, newLightPos);
    /////////
    stack.clear();
    
    
    //bb8
//    stack.push();
//    var bb8 = new Bb8();
//    stack.multiply(translate(0, -0.75, -1));
//    stack.multiply(scalem(0.1, 0.1, 0.1));
//    bb8.drawBb8();
//    stack.pop();
//    
//newBb8Loc = mult(translate(0,-0.75,-1),mult(vm,bb8Loc));
//console.log(newBb8Loc);
    
    stack.multiply(vm);

    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.axis.draw();

    //draw scene
    stack.push();
    drawScene();
    stack.pop();


    //draw light cube
    stack.push();
    stack.multiply(rotateY(lightAngle));
    stack.multiply(translate(light.light_position[0], light.light_position[1], light.light_position[2]));
    stack.multiply(scalem(0.25, 0.25, 0.25));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();

}

function drawScene() {
//    var width = Shapes.maze.width;

    //bb8
    stack.push();
    var bb8 = new Bb8();
    stack.multiply(translate(0, 0, distance));
    stack.multiply(translate(distance2, 0, 0));
    stack.multiply(scalem(0.2, 0.2, 0.2));
    bb8.drawBb8();
    stack.pop();


    stack.push();
    var bb8 = new Bb8();
    stack.multiply(translate(bb8Loc[0], bb8Loc[1]-0.75, bb8Loc[2]));
//    stack.multiply(translate(camera.eye[0], camera.eye[1]-0.75, camera.eye[2]-1));
//    stack.multiply(translate(0,0.75,1));
//    stack.multiply(rotateY(thetaR));
//    stack.multiply(translate(0,-0.75,-1));
    stack.multiply(scalem(0.1, 0.1, 0.1));
    bb8.drawBb8();
    stack.pop();

    //draw maze
    stack.push();
    //stack.multiply(scalem(width/Shapes.maze.mazegen.gridSize, 1, width/Shapes.maze.mazegen.gridSize));
    stack.multiply(scalem(2, 1, 2)); //makes maze bigger, easier to navigate through
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.maze.drawMaze();
    stack.pop();

    //stairs
    var stair_offset = ((Shapes.maze.mazegen.gridSize -1)/ -2) + Shapes.maze.mazegen.startRow;
    stack.push();
    stack.multiply(scalem(2, 1, 2));
    stack.multiply(translate(stair_offset, 0, 0)); //starts start at the finish of first maze
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.stair.drawSteps();
    stack.pop();

    //level 2
    var offsetz = -(2 * Shapes.maze2.size + Shapes.stair.run);
    var offsetx = ((Shapes.maze2.mazegen.gridSize -1)/ -2) + Shapes.maze2.mazegen.startRow - stair_offset;
    console.log(offsetz);
    
    stack.push();
    stack.multiply(translate(-offsetx, Shapes.stair.rise, offsetz));
    stack.multiply(scalem(2,1,2));
    //stack.multiply(scalem(width/Shapes.maze2.mazegen.gridSize, 1, width/Shapes.maze2.mazegen.gridSize));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.maze2.drawMaze(); //need to change so that the two mazes are different
    stack.pop();
}
