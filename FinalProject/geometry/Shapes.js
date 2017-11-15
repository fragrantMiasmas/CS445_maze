/*
Programmed by Daniel Koenig and Ariel Todoki for Lab 4 in Professor Orr's CSS-445 Computer Graphics Course
*/

/** Build and Draw Primitive Shapes
 * 
 * Global Variables:
 *   gl: the webgl graphics context.
 *   vPosition: shader variable location for vertex position attribute
 *   vColor: shader variable location for color attribute
 */

var Shapes = {};   // set up Shapes namespace

Shapes.cube = new Cube();  
Shapes.axis = new Axis();
// TO DO: ADD OTHER SHAPES
Shapes.cone = new Cone(16);
Shapes.cylinder = new Cylinder(16);
Shapes.disk = new Disk(16);
//Shapes.train = new Train();

Shapes.initShapes = function () {
    Shapes.initBuffers(Shapes.cube);
    // TO DO: ADD OTHER SHAPES
    Shapes.initBuffers(Shapes.cone);
    Shapes.initBuffers(Shapes.cylinder);
    Shapes.initBuffers(Shapes.disk);

}
Shapes.initShapes = function () {
    Shapes.initBuffers(Shapes.cube);
    Shapes.initBuffers(Shapes.cylinder);
    Shapes.initBuffers(Shapes.disk);
    Shapes.initBuffers(Shapes.cone);

    Shapes.axis.initBuffer();
};


Shapes.initBuffers = function (primitive) {

    // SET UP ARRAY BUFFER FOR VERTICES 
    ////////////////////////////////////////////////////////////
    primitive.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer


    // SET UP ARRAY BUFFER FOR VERTEX COLORS 
    ////////////////////////////////////////////////////////////
    primitive.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // done with this buffer

    // SET UP ARRAY BUFFER FOR NORMALS
    ////////////////////////////////////////////////////////////
    primitive.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.normals),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // SET UP ARRAY BUFFER FOR TEXTURE COORDINATES
    ////////////////////////////////////////////////////////////
    primitive.texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(primitive.texCoords), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

Shapes.drawPrimitive = function (primitive) {

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.vertexBuffer);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.colorBuffer);
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.normalBuffer);
    gl.enableVertexAttribArray(vNormal);
    gl.vertexAttribPointer(vNormal, 4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.texBuffer);
    gl.enableVertexAttribArray(vTexCoords);
    gl.vertexAttribPointer(vTexCoords, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, primitive.numVertices);

    gl.disableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.disableVertexAttribArray(vNormal);
    gl.disableVertexAttribArray(vTexCoords);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    //Shapes.drawWiredPrimitive(primitive);
};

//Shapes.drawWiredPrimitive = function (primitive) {
//
//    gl.uniform4fv(uColor, vec4(0.0, 0.0, 0.0, 1.0)); 
//    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeBuffer);
//    gl.enableVertexAttribArray(vPosition);
//    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
//
//    gl.bindBuffer(gl.ARRAY_BUFFER, primitive.edgeColorBuffer);
//    gl.enableVertexAttribArray(vColor);
//    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
//
//    gl.drawArrays(gl.LINES, 0, primitive.numEdgeVertices);
//
//    gl.disableVertexAttribArray(vPosition);
//    gl.disableVertexAttribArray(vColor);
//    gl.bindBuffer(gl.ARRAY_BUFFER, null);
//}



