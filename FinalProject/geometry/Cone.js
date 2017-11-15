/* 
 * Ariel Todoki and Sophia Anderson (Sophia independently wrote Cone.js)
 * Lab #2
 * Due: September 13, 2017
 */

//x is user input for the number of slices
function Cone(x) {
    var N = x;

    this.name = "Cone"; //shape name

    this.numTriangles = N * 2; // has twice the triangles of a disk
    this.numVertices = this.numTriangles * 3; //three verticies per triangle

    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];


    for (var i = 0; i < N; i++)
    {
        var angle = (2 * Math.PI) / N; //angle of the triangle
        var height = 1; // height of the cone

        //creating the verticies for the center, tip, and the varying triangle sides
        var center = vec4(0, 0, 0, 1.0);
        var point1 = vec4(Math.cos(i * angle), 0, Math.sin(i * angle), 1.0);
        var point2 = vec4(Math.cos((i + 1) * angle), 0, Math.sin((i + 1) * angle), 1.0);
        var tip = vec4(0, height, 0, 1.0);

        //pushing all verticies for triangle on bottom of cone
        this.vertices.push(center);
        this.vertices.push(point1);
        this.vertices.push(point2);

        ///pushing all verticies for the triangle going to tip
        this.vertices.push(tip);
        this.vertices.push(point1);
        this.vertices.push(point2);

        //pushing colors for bottom of cone
        this.colors.push(vec4(1.0, 0, 0, 1.0));
        this.colors.push(vec4(1, .5, 0, 1.0));
        this.colors.push(vec4(1.0, 0, .5, 1.0));

        //pushing colors for side of cone
        this.colors.push(vec4(1.0, 0, 0, 1.0));
        this.colors.push(vec4(1, .5, 0, 1.0));
        this.colors.push(vec4(1.0, 0, .5, 1.0));

        //pushing normals for bottom of cone
        for (var k = 0; k < 3; k++) {
            this.normals.push(vec4(0, -1, 0, 0));
        }

        //pushing normals for side of cone
        vector1 = subtract(point1, tip);
        vector2 = subtract(point2, tip);
        var normalizedNorm = normalize(cross(vector2, vector1));
        for (var k = 0; k < 3; k++) {
            this.normals.push(vec4(normalizedNorm[0], normalizedNorm[1], normalizedNorm[2], 0));
        }

        //pushing texture coordinates for bottom and sides of cone
        for (var t = 0; t < 2; t++) {
            this.texCoords.push(vec2(0.5, 0.5));
            this.texCoords.push(vec2((Math.cos(angle * i) * 0.5) + 0.5, (Math.sin(angle * i) * 0.5) + 0.5));
            this.texCoords.push(vec2((Math.cos(angle * (i + 1)) * 0.5) + 0.5, (Math.sin(angle * (i + 1)) * 0.5) + 0.5));
        }
    }

}


