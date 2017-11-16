
function Bb8(){
    this.name = "BB8";
    this.headHeight = 1.7;
    this.antennaHeight = this.headHeight * 1.5;
    this.antennaRad = this.headHeight/100;
    this.bodyWidth = 2.5;
    this.topColor = vec4(1.0, 0.0, 0.0, 1.0); //red
    this.bottomColor = vec4(0.0, 1.0, 0.0, 1.0); //green
    this.headTexture = headTexture;
    this.bodyTexture = bodyTexture2;
}

Bb8.prototype.drawAntennas = function(){
    stack.push();
    stack.multiply(translate(this.antennaRad,this.headHeight + this.bodyWidth,this.antennaRad));
    stack.multiply(scalem(0.1,this.antennaHeight,0.1));
    Shapes.drawPrimitive(Shapes.cylinder, { transform: stack.top (), color: vec4(0,0,0,1) }); 
    gl.uniform1i(uColorMode, 1);
    stack.pop();
}
Bb8.prototype.drawHead = function(){
    stack.push();
    stack.multiply(translate(0,this.bodyWidth,0));
    stack.multiply(scalem(this.headHeight,this.headHeight,this.headHeight));
    gl.uniform1i(uColorMode, 2);
    this.headTexture.activate();
    Shapes.drawPrimitive(Shapes.semisphere, { transform: stack.top (), color: this.headTexture.activate() }); 
    stack.pop();
}

Bb8.prototype.drawBody = function(){
    stack.push();
    stack.multiply(scalem(this.bodyWidth,this.bodyWidth,this.bodyWidth)); 
    Shapes.drawPrimitive(Shapes.sphere, { transform: stack.top (), color: this.bodyTexture.activate() }); 
    gl.uniform1i(uColorMode, 2);
    this.bodyTexture.activate();
    stack.pop();
}

Bb8.prototype.drawBb8 = function(){
    stack.multiply(translate(0,this.bodyWidth,0));
    this.drawAntennas();
    this.drawHead();
    stack.multiply(rotateX(thetaX));
    stack.multiply(rotateY(thetaX));
    this.drawBody();
}