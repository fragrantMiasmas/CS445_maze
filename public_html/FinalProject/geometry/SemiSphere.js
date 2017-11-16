
function SemiSphere(num_sides) { //start with disks instead of cylinders

    //create two disks and connect them together
    this.name = "SemiSphere";
    var num_cylinders = num_sides;
    this.numTriangles = (num_sides * num_cylinders * 2) + num_sides;
    this.numVertices = this.numTriangles * 3;
    this.colors = [];
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////

    var color1 = vec4(0.0, 0.0, 1.0, 1.0); // blue
    var color2 = vec4(1.0, 0.0, 1.0, 1.0); // blue
    var color3 = vec4(0.0, 1.0, 1.0, 1.0); // blue

    var outside_vertices = [];
    var bottom_vertices = [];


    //put vertices in a their location
    for (var i = 0; i < num_cylinders; i++) {

        outside_vertices[i] = [];
        //-1 to fix weird gap
        var percent1 = (i * Math.PI / 2) / (num_cylinders - 1);
        var radius = Math.sin(percent1); //beginning point should = (1,0) 
        var yval = Math.cos(percent1);

        for (var j = 0; j < num_sides; j++) { //create each disk
            var percentage = (2 * Math.PI * j) / num_sides;
            var xval = Math.cos(percentage) * radius;
            var zval = Math.sin(percentage) * radius;
            var newpoint = vec4(xval, yval, zval, 1);
            outside_vertices[i][j] = newpoint;
//            console.log(newpoint);
        }
    }

    //fill in bottom disk
    for (var i = 0; i < num_sides; i++) {
        var percentage = (2 * Math.PI * i) / num_sides;
        var newpoint = vec4(Math.cos(percentage), 0, Math.sin(percentage));
        bottom_vertices[i] = newpoint;
    }

    //color in triangles
    for (var i = 0; i < num_cylinders; i++) {

        for (var j = 0; j < num_sides; j++) {

            p1 = outside_vertices[i][j];
            p2 = outside_vertices[(i + 1) % num_sides][j];
            p3 = outside_vertices[i][(j + 1) % num_sides];

            p4 = outside_vertices[i][(j + 1) % num_sides];
            p5 = outside_vertices[(i + 1) % num_sides][j];
            p6 = outside_vertices[(i + 1) % num_sides][(j + 1) % num_sides];


            //normals
            var percentage = (2 * Math.PI * j) / num_sides;
            var percentage2 = (2 * Math.PI * ((j + 1) % num_sides)) / num_sides;
            var ypercent = (i * 3 * Math.PI / 2) / num_cylinders;
            
            var ynorm = Math.cos(ypercent);
            var norm = vec4(Math.cos(percentage), ynorm, Math.sin(percentage), 0); //bottom disk normal
            var norm2 = vec4(Math.cos(percentage2), ynorm, Math.sin(percentage), 0); //bottom disk normal
            var norm3 = vec4(Math.cos(percentage), ynorm, Math.sin(percentage2), 0); //bottom disk normal
            var norm4 = vec4(Math.cos(percentage2), ynorm, Math.sin(percentage2), 0); //bottom disk normal

            //texcoords
            var angle = ((360/num_sides) *i)/360;
//            var angle2 = ((360/num_sides) *j)/360 + 90;
            
            t1 = vec2(angle, 0.5);

            this.vertices.push(p1, p2, p3, p4, p5, p6);
            this.colors.push(color1, color2, color3, color1, color2, color3);
            this.normals.push(norm, norm2, norm3, norm3, norm2, norm4);
            this.texCoords.push(t1, t1, t1, t1, t1, t1);

        }

    }

    //push bottom disk
    for (var i = 0; i < num_sides; i++) {
        var normal = vec4(0, -1, 0, 0);


        tex = vec2(0.5, 0.5);
        tex2 = vec2((Math.cos(percentage) + 1) / 2, (Math.sin(percentage) + 1) / 2);
        tex3 = vec2((Math.cos(percentage2) + 1) / 2, (Math.sin(percentage) + 1) / 2);

        p7 = vec4(0, 0, 0, 1);
        p8 = bottom_vertices[i];
        p9 = bottom_vertices[(i + 1) % num_sides];

        this.vertices.push(p7, p8, p9);
        this.colors.push(color1, color2, color3);
        this.normals.push(normal, normal, normal);
        this.texCoords.push(tex, tex2, tex3);
    }

}

