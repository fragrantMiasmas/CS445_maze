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

var lightAngle = 0;

var program;

window.onload = function init()
{   
    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.309, 0.505, 0.74, 1.0);
    
    gl.enable(gl.DEPTH_TEST);
    
    shaderSetup();
    
    Shapes.initShapes();  // create the primitive and other shapes  
    
    checkerboard = new Checkerboard();
    verticalBands = new VerticalBands();
    softBands = new SoftBands();
    gradient = new Gradient();
    imageTexture = new ImageTexture("textures/download.jpg");
    imageTexture2 = new ImageTexture("textures/test.jpg");
    
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

function sliderEventHandler(value){
    lightAngle = value;
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix  
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));
    
    var viewMat = camera.calcViewMat();   // View matrix
    
    //////////
    var newLightPos = mult(viewMat, mult(rotateY(lightAngle),light.light_position));
    gl.uniform4fv(uLight_position, newLightPos);
    /////////

    stack.clear();
    stack.multiply(viewMat); 
    
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.axis.draw();
    
    //Draw cube
    stack.push();
    stack.multiply(translate(-6,1,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform1i(uColorMode, 0); //vertex color mode
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    //Draw cylinder
    stack.push();
    stack.multiply(translate(3,1,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    imageTexture.activate();
    //checkerboard.activate();
    gl.uniform1i(uColorMode, 2);
    Shapes.drawPrimitive(Shapes.cylinder);
    stack.pop();
    
    //Draw disk
    stack.push();
    stack.multiply(translate(0,0.5,3));
    stack.multiply(rotateX(90));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0,1,0,1));
    gl.uniform1i(uColorMode, 1); //uniform color mode
    Shapes.drawPrimitive(Shapes.disk);
    stack.pop();
    
    
    //Draw cone
    stack.push();
    stack.multiply(translate(-3,1.5,0));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform1i(uColorMode, 3); //shader color mode
    Shapes.drawPrimitive(Shapes.cone);
    stack.pop();

    //draw train.
    stack.push();
    var train = new Train();
    softBands.activate();
    gl.uniform1i(uColorMode, 2); //texture color mode
    train.drawTrain();
    stack.pop();

    stack.clear(); //reclear stack because of some weird stack pushing issue in train.js
    stack.multiply(viewMat);    

    //draw floor 
    stack.push();
    stack.multiply(translate(0,-0.05,0));
    stack.multiply(scalem(10, .1, 10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gradient.activate();
    gl.uniform1i(uColorMode, 2); //texture color mode
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    //draw light cube
    stack.push();
    stack.multiply(rotateY(lightAngle));
    stack.multiply(translate(light.light_position[0],light.light_position[1],light.light_position[2]));
    stack.multiply(scalem(0.25,0.25,0.25));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0,0,1,1));
    gl.uniform1i(uColorMode, 1);
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
}

