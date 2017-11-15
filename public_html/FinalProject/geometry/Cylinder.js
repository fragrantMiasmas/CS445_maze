
function Cylinder(num_sides, height){
    
    //create two disks and connect them together
    this.name = "Cylinder";
    this.numVertices = num_sides*12; //12
    this.numTriangles = num_sides *4; //4
    this.colors = [];
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    
     // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    var color1 = vec4(0.0, 1.0, 0.0, 1.0); 
    var color2= vec4(0.0, 1.0, 0.0, 1.0);
    var color3 = vec4(1.0, 0.0, 0.0, 1.0);
    var color4 = vec4(1.0, 0.0, 1.0, 1.0); //side colors    
    
    //top disk
    var top_vertex = vec4(0, height, 0, 1); //offset of 0 makes a flat disk
    var top_vertices = [];
    //bottom disk
    var bottom_center_vertex = vec4(0, -height, 0, 1); //bottom
    var bottom_vertices = [];

    
    // C____ B
    //  |  /
    //  | /
    //  |/
    //  A
    //side, top left triangle
//    var leftC = []; //equivalent to top[i]
//    var leftA = []; //equivalent to bottom[i]
//    var leftB = []; //equivalent to top[i+1]
    
    //     A
    //    /|
    //   / |
    //B /__| C
    //  
    //side, bottom right triangle
//    var rightC = []; //equivalent to bottom[i+1]
//    var rightA = []; //equivalent top[i+1]
//    var rightB = []; //equivalent to bottom[i]
      
 
    //map out the vertices
    for(var i=0; i<num_sides;i++){
        var percentage = (2*Math.PI *i)/num_sides;
        
        var top_points = vec4(Math.cos(percentage), height, Math.sin(percentage), 1);
        var bottom_points = vec4(Math.cos(percentage), -height, Math.sin(percentage), 1);
        
        top_vertices[i] = top_points; //top disk
        bottom_vertices[i] = bottom_points; //bottom disk
    }
    
   
    //rendering
    for (var i = 0; i < num_sides; i++) {
        var percentage = (2*Math.PI *i)/num_sides;
        var percentage2 = (2*Math.PI *((i+1) % num_sides))/num_sides;
        
        //note: w val is 0 for normals
        var norm = vec4(0,1,0,0); //top disk normal
        var norm2 = vec4(Math.cos(percentage),0,Math.sin(percentage),0); //bottom disk normal
        var norm3 = vec4(Math.cos(percentage2),0,Math.sin(percentage2),0); //side face normals
        var norm4 = vec4(0,-1,0,0); //bottom disk normal
        
        //texture Coordinates
        
        //for disk portion, vec2(x,z)
        var x1 = (Math.cos(percentage)+1) /2;
        var x2 = (Math.cos(percentage2) +1)/2; //i+1
        var z1 = (Math.sin(percentage)+1) /2;
        var z2 = (Math.sin(percentage)+1) /2; //i+1
        //((Math.cos(percentage)/360) +1) /2;
        
        var angle = ((360/num_sides) *i)/360;
//        var angle2 = ((360/num_sides) * ((i+1) % num_sides))/360;
        
        t1 = vec2(0.5, 0.5); //(center vertex + r)/2 both top and bottom
        t2 = vec2(x1, z1);
        t3 = vec2(x2, z2);
        
        //top vertices of s8ides, vec2
        t4 = vec2(angle, 1); //y = (0.5 + 1)/2
        t5 = vec2(angle, 1);

        //bottom vertices of sides, vec2
        t6 = vec2(angle, 0);  //y = (-0.5 + 1)/2
        t7 = vec2(angle, 0);

        
        //top disk
        p1 = top_vertex; //t1
        p2 = top_vertices[i]; //t2
        p3 = top_vertices[(i+1) % num_sides]; //t3
        
        //fill out the bottom
        p4 = bottom_center_vertex; //t1
        p5 = bottom_vertices[i]; //t2
        p6 = bottom_vertices[(i+1) % num_sides]; //t3
        
        //fill in the sides
       
        //left triangle
        p7 = top_vertices[i]; //t4
        p8 = bottom_vertices[i]; //t6
        p9 = top_vertices[(i+1)%num_sides]; //t5
        
        //right triangle
        p10 = bottom_vertices[(i+1) % num_sides]; //t7
        p11 = top_vertices[(i+1) % num_sides]; //t5
        p12 = bottom_vertices[i]; //t6
        
        this.vertices.push(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12); //will have 12
        this.normals.push(norm,norm,norm,norm4,norm4,norm4, norm2,norm2,norm3,norm3,norm3,norm2);
        this.texCoords.push(t1,t2,t3,t1,t2,t3,t4,t6,t5,t7,t5,t6);
        this.colors.push(color1, color1, color1, color2, color2, color2, color3, color3, color3, color4, color4, color4);
    }
}

