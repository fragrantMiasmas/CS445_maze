/*
 Ariel Todoki
 CS 445 Graphics
 Lab 7-Textures
 Due: November 3, 2017
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
var distance = 0; //moving ovjects independently

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

//var mazegen = new MazeGen(21);

var program;

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
    projMat = ortho(-10, 10, -10, 10, 1, 1000); //ortho(left,right,bottom,top,near,far)
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    viewMat = lookAt(vec3(0, 10, 0), vec3(0, 0, 0), vec3(1, 0, 0)); // lookAt(eye,at,up)
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
    Shapes.axis.draw();

    //draw scene
    stack.push();
    drawScene();
    stack.pop();

    //draw floor 
//    stack.push();
//    stack.multiply(translate(0, -0.05, 0));
//    stack.multiply(scalem(10, .1, 10));
//    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
//    gradient.activate();
//    gl.uniform1i(uColorMode, 2); //texture color mode
//    Shapes.drawPrimitive(Shapes.cube);
//    stack.pop();

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
    var width = Shapes.maze.width;
    
    
    //bb8
    stack.push();
    var bb8 = new Bb8();
//    stack.multiply(translate(2, 0, -2));
    stack.multiply(translate(0,0,distance));
    stack.multiply(scalem(0.2, 0.2, 0.2));
    bb8.drawBb8();
    stack.pop();

       //draw maze
    stack.push();
    //stack.multiply(translate(0,1.5,0));
    stack.multiply(scalem(width/mazegen.gridSize, 1, width/mazegen.gridSize));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 0, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.maze.drawMaze();
    stack.pop();
}
