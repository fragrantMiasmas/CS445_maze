/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Cone(num_sides, height){ //num division determines resolution and number of triangles

    this.name = "Cone";
    this.numVertices = num_sides*6;
    this.numTriangles = num_sides *2;
    this.colors = [];
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    
    
     // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
    
    var top_vertex = vec4(0, height, 0, 1); //offset of 0 makes a flat disk
    var outside_vertices = [];
    
    var bottom_center_vertex = vec4(0, 0, 0, 1); //bottom
    var bottom_vertices = [];
    
    var color1 = vec4(0.0, 1.0, 0.0, 1.0); 
    var color2= vec4(1.0, 0.0, 0.0, 1.0);
    var color3 = vec4(0.0, 1.0, 1.0, 1.0);
       
    //put vertices in a their location
    for(var i=0; i<num_sides;i++){
        var percentage = (2*Math.PI *i)/num_sides;
        var newpoint = vec4(Math.cos(percentage), 0, Math.sin(percentage));
        outside_vertices[i] = newpoint;
        bottom_vertices[i] = newpoint; //bottom portion
    }
    
    //rendering
    for (var i = 0; i < num_sides; i++) {
        
        var percentage = (2*Math.PI *i)/num_sides;
        var percentage2 = (2*Math.PI *((i+1) % num_sides))/num_sides;
        
        var norm = vec4(0,1,0,0);
        
        // y value = negative inverse of slope, but it's a 45 d angle, so just 1
        var norm2 = vec4(Math.cos(percentage),1,Math.sin(percentage),0); //bottom disk normal
        var norm3 = vec4(Math.cos(percentage2),1,Math.sin(percentage2),0); //side face normals
        
        //texture coordinates
        //sides
        var x1 = (Math.cos(percentage)+1) /2;
        var x2 = (Math.cos(percentage2) +1)/2;
        var z1 = (Math.sin(percentage)+1) /2;
        var z2 = (Math.sin(percentage)+1) /2;
        //sides
//        t1 = vec2(0.5, 1);
//        t2 = vec2(-x1, 0.5);
//        t3 = vec2(-x2, 0.5);
        
         //bottom disk portion
        t4 = vec2(0.5, 0.5);
        t5 = vec2(x1, z1);
        t6 = vec2(x2, z2);
        
        //fill in cone portion
        p1 = top_vertex; //t1
        p2 = outside_vertices[i]; //t2
        p3 = outside_vertices[(i+1) % num_sides]; //t3
        
        //fill out the bottom
        p4 = bottom_center_vertex; //t4
        p5 = bottom_vertices[i]; //t5
        p6 = bottom_vertices[(i+1) % num_sides]; //t6
        
        this.vertices.push(p1, p2, p3, p4, p5, p6);
        this.normals.push(norm,norm2,norm3,norm,norm2,norm3);
        this.texCoords.push(t4,t5,t6,t4,t5,t6);
        this.colors.push(color1, color2, color3,color1, color2, color3);
    }
}
