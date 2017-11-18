/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Node(nR, nC){
    this.row = nR;
    this.col = nC;
    
    this.topRow = nR-2;
    
    this.rightCol = nC +2;
    
    this.botRow = nR+2;
    
    this.leftCol = nC-2;
    
    this.path = 0;
    this.visit = 0;
    
    
    //this.priority = pri;
}

Node.prototype.getRow = function(){
    return this.row;
};

Node.prototype.getCol = function(){
    return this.col;
};

Node.prototype.getTopRow = function(){
    return this.topRow;
};


Node.prototype.getRightCol = function(){
    return this.rightCol;
};


Node.prototype.getBotRow = function(){
    return this.botRow;
};


Node.prototype.getLeftCol = function(){
    return this.leftCol;
};


Node.prototype.isPath = function(){
    return this.path;
};

Node.prototype.isVisit = function(){
    return this.visit;
};

Node.prototype.setPath = function(){
    this.path = 1;
};

Node.prototype.setVisit = function(){
    this.visit = 1;
};
