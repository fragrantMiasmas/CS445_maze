function Stairs(){
    this.name = "Stairs";
    this.location = vec4(0,0,0,1); //change later
    this.height = 6;
    this.width = 2;
    this.depth = 2/3 * this.width; //of each step
    this.numSteps = 12;
    this.stepHeight = this.height/this.numSteps;
    
    //change slope so that the bottom ending and top enterance align
    this.stepInc = 1/this.depth; //slope
    this.color = vec4(0,0,1,1);
}
Stairs.prototype.drawSteps = function(){
    
    //translate to starting location
    stack.multiply(translate(0,0,-7));
        
    for(var i = 0; i<this.numSteps;i++){
        
        var scale = this.stepHeight * i;
        var increment = this.stepInc * i;
    
        stack.push();
        //may need to rotate stairwell at an angle
        stack.multiply(translate(0,scale,increment));
        stack.multiply(scalem(this.width,this.stepHeight,1));
        Shapes.drawPrimitive(Shapes.cube, { transform: stack.top (), color: this.color }); 
        stack.pop();
      } 
}

