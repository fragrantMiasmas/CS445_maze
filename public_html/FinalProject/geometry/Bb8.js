
function Bb8(){
    this.name = "BB8";
    this.headWidth = 1.7;
    this.bodyWidth = 2.5;
    this.topColor = vec4(1.0, 0.0, 0.0, 1.0); //red
    this.bottomColor = vec4(0.0, 1.0, 0.0, 1.0); //green
}

Bb8.prototype.drawHead = function(){
    stack.push();
    stack.multiply(translate(0,this.bodyWidth,0));
    stack.multiply(scalem(this.headWidth,this.headWidth,this.headWidth));
    Shapes.drawPrimitive(Shapes.semisphere, { transform: stack.top (), color: this.topColor }); 
    stack.pop();
}

Bb8.prototype.drawBody = function(){
    stack.push();
//    stack.multiply(translate(0,this.bodyWidth,0));
    stack.multiply(scalem(this.bodyWidth,this.bodyWidth,this.bodyWidth)); 
    Shapes.drawPrimitive(Shapes.sphere, { transform: stack.top (), color: this.bottomColor }); 
    stack.pop();
}

Bb8.prototype.drawBb8 = function(){
    stack.multiply(translate(0,this.bodyWidth,0));
    this.drawHead();
    stack.multiply(rotateX(thetaX));
    this.drawBody();
}