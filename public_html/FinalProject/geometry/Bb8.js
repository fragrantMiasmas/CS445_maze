
function Bb8(){
    this.name = "BB8";
    this.headWidth = 1.7;
    this.bodyWidth = 2.5;
    this.topColor = vec4(1.0, 0.0, 0.0, 1.0); //red
    this.bottomColor = vec4(0.0, 1.0, 0.0, 1.0); //green
    this.headTexture = headTexture;
    this.bodyTexture = bodyTexture2;
}

Bb8.prototype.drawHead = function(){
    stack.push();
    stack.multiply(translate(0,this.bodyWidth,0));
    stack.multiply(scalem(this.headWidth,this.headWidth,this.headWidth));
    gl.uniform1i(uColorMode, 2);
    this.headTexture.activate();
    Shapes.drawPrimitive(Shapes.semisphere, { transform: stack.top (), color: this.headTexture.activate() }); 
    stack.pop();
}

Bb8.prototype.drawBody = function(){
    stack.push();
//    stack.multiply(translate(0,this.bodyWidth,0));
    stack.multiply(scalem(this.bodyWidth,this.bodyWidth,this.bodyWidth)); 
    Shapes.drawPrimitive(Shapes.sphere, { transform: stack.top (), color: this.bodyTexture.activate() }); 
    gl.uniform1i(uColorMode, 2);
    this.bodyTexture.activate();
    stack.pop();
}

Bb8.prototype.drawBb8 = function(){
    stack.multiply(translate(0,this.bodyWidth,0));
    this.drawHead();
    stack.multiply(rotateX(thetaX));
    this.drawBody();
}