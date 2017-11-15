/* 
 * Ariel Todoki and Sophia Anderson (Ariel independently wrote Cylinder.js)
 * Lab #2
 * Due: September 13, 2017
 */

///// CYLINDER DEFINTION
/////
///// Cylinder is defined to be centered at the origin of the coordinate reference system. 
///// Cylinder faces are lying in the XZ plane, Y=-1 and Y=1, radius = 1
///// Cylinder height = 2
///// slice variable indicates the number of "pizza slices" for the cylinder faces

///// Always use the Right Hand Rule to generate vertex sequence. We want outward facing normals.

//x is user input for the number of slices
function Cylinder(x) {
    var slice = x;

    this.name = "cylinder";

    this.numTriangles = slice * 4;
    this.numVertices = this.numTriangles * 3;
    this.radius = 1;

    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.texCoords = [];

    //Declare angle per slice in radians
    var angle = (2 * Math.PI) / slice;

    //Push all vertices and colors to corresponding arrays
    for (var i = 0; i < slice; i++) {
        /////////// Bottom face //////////////////
        //cylinder bottom face vertices
        var centerPt = vec4(0, -1, 0, 1);
        var bVertex1 = vec4(Math.cos(angle * i) * this.radius, -1, Math.sin(angle * i) * this.radius, 1);
        var bVertex2 = vec4(Math.cos(angle * (i + 1)) * this.radius, -1, Math.sin(angle * (i + 1)) * this.radius, 1);

        this.vertices.push(centerPt);
        this.vertices.push(bVertex1);
        this.vertices.push(bVertex2);

        //cylinder bottom face normals
        var cross1 = subtract(bVertex1, centerPt);
        var cross2 = subtract(bVertex2, centerPt);
        var normalizedNorm = normalize(cross(cross1, cross2));
        normalizedNorm = vec4(normalizedNorm[0], normalizedNorm[1], normalizedNorm[2], 0);
        for (var k = 0; k < 3; k++) {
            this.normals.push(normalizedNorm);
        }
        
        //cylinder bottom face texture coordinates
        this.texCoords.push(vec2(0.5, 0.5));
        this.texCoords.push(vec2((Math.cos(angle * i) * 0.5) + 0.5, (Math.sin(angle * i) * 0.5) + 0.5));
        this.texCoords.push(vec2((Math.cos(angle * (i + 1)) * 0.5) + 0.5, (Math.sin(angle * (i + 1)) * 0.5) + 0.5));

        /////////// Top face //////////////////  
        //cylinder top face vertices
        centerPt = vec4(0, 1, 0, 1);
        var tVertex1 = vec4(Math.cos(angle * i) * this.radius, 1, Math.sin(angle * i) * this.radius, 1);
        var tVertex2 = vec4(Math.cos(angle * (i + 1)) * this.radius, 1, Math.sin(angle * (i + 1)) * this.radius, 1);

        this.vertices.push(centerPt);
        this.vertices.push(tVertex2);
        this.vertices.push(tVertex1);

        //cylinder top face normals
        cross1 = subtract(tVertex1, centerPt);
        cross2 = subtract(tVertex2, centerPt);
        normalizedNorm = normalize(cross(cross2, cross1));
        normalizedNorm = vec4(normalizedNorm[0], normalizedNorm[1], normalizedNorm[2], 0);
        for (var k = 0; k < 3; k++) {
            this.normals.push(normalizedNorm);
        }
        
        //cylinder top face texture coordinates
        this.texCoords.push(vec2(0.5, 0.5));
        this.texCoords.push(vec2((Math.cos(angle * (i + 1)) * 0.5) + 0.5, (Math.sin(angle * (i + 1)) * 0.5) + 0.5));
        this.texCoords.push(vec2((Math.cos(angle * i) * 0.5) + 0.5, (Math.sin(angle * i) * 0.5) + 0.5));

        /////////// Bottom and Top face  ///////////
        // Declare color variables
        var c1 = vec4(1.0, 0.0, 1.0, 1.0); //magenta
        var c2 = vec4(1.0, 1.0, 1.0, 1.0); //white
        var c3 = vec4(1.0, 0.0, 0.0, 1.0); //red

        //cylinder face colors (alternating colors)
        if (i % 2 !== 0) {
            for (var n = 0; n < 6; n++) {
                this.colors.push(c1);
            }

        } else {
            for (var n = 0; n < 6; n++) {
                this.colors.push(c2);
            }
        }

        
        /////////// Body //////////////////
        //cylinder body (top face to bottom face) vertices
        this.vertices.push(tVertex1);
        this.vertices.push(tVertex2);
        this.vertices.push(bVertex1);

        //cylinder body (top face to bottom face) normals
        cross1 = subtract(tVertex1, bVertex1);
        cross2 = subtract(tVertex2, bVertex1);
        normalizedNorm = normalize(cross(cross1, cross2));
        normalizedNorm = vec4(normalizedNorm[0], normalizedNorm[1], normalizedNorm[2], 0);
        for (var k = 0; k < 3; k++) {
            this.normals.push(normalizedNorm);
        }


        //cylinder body (top face to bottom face) colors
        for (var m = 0; m < 3; m++) {
            this.colors.push(c2);
        }

        //cyinder body (top face to bottom face) texture coordinates
        texSliceWidth = 1 / slice;
        texSliceInc = texSliceWidth * i;
        this.texCoords.push(vec2(texSliceInc, 0));
        this.texCoords.push(vec2(texSliceInc + texSliceWidth, 0));
        this.texCoords.push(vec2(texSliceInc, 1));

        //cylinder body (bottom face to top face) vertices
        this.vertices.push(bVertex2);
        this.vertices.push(bVertex1);
        this.vertices.push(tVertex2);

        //cylinder body (bottom face to top face) normals
        cross1 = subtract(bVertex1, tVertex2);
        cross2 = subtract(bVertex2, tVertex2);
        normalizedNorm = normalize(cross(cross2, cross1));
        normalizedNorm = vec4(normalizedNorm[0], normalizedNorm[1], normalizedNorm[2], 0);
        for (var k = 0; k < 3; k++) {
            this.normals.push(normalizedNorm);
        }

        //cylinder body (bottom face to top face) colors
        for (var m = 0; m < 3; m++) {
            this.colors.push(c3);
        }

        //cylinder body (bottom face to top face) texture coordinates
        this.texCoords.push(vec2(texSliceInc + texSliceWidth, 1));
        this.texCoords.push(vec2(texSliceInc, 1));
        this.texCoords.push(vec2(texSliceInc + texSliceWidth, 0));
//        this.texCoords.push(vec2(texSliceInc,0));
//        this.texCoords.push(vec2(texSliceInc+texSliceWidth,0));
//        this.texCoords.push(vec2(texSliceInc,1));


    }



}
