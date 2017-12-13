/* 
 * Elizabeth Reed
 * CS445 Graphics
 * Lab 8 Final
 * Th A-maze-ing Race
 * 
 * Draws stairs in the scene
 */

function Stairs(){
    this.name = "Stairs";
//    this.location = MazeGen.startRow; //change later
    this.rise = 6;
    this.run = 8;
    this.width = 1;
    this.numSteps = 12;
    this.stepHeight = this.rise/this.numSteps;
    this.depth = this.run/this.numSteps; //of each step
    this.slope = this.rise /this.run; //slope
    
    this.color = vec4(0,0,1,1);
}
Stairs.prototype.drawSteps = function(){
    
    //translate to starting location
    stack.multiply(translate(0,0,-4));
    stack.multiply(rotateY(180));    
    for(var i = 0; i<this.numSteps;i++){
        
        var scale = this.stepHeight * i;
        var increment = this.slope * i;
    
        stack.push();
        //may need to rotate stairwell at an angle
        stack.multiply(translate(0,scale,increment));
        stack.multiply(scalem(this.width,this.stepHeight,1));
        Shapes.drawPrimitive(Shapes.cube, { transform: stack.top (), color: this.color }); 
        stack.pop();
      } 
}

