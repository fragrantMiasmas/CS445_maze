/* 
 * Ariel Todoki
 * CS 445 Graphics
 * Lab 8 (Final)
 * The A-maze-ing Race
 * 
 * Node is used as a cell in a 2D array that says whether or not there is a wall
 * or not in its spot
 * 
 * Node.js is used in MazeGen.js
 */
function Node(nR, nC){
    this.row = nR; // row index of the node
    this.col = nC; // column index of the node
    
    // indeces of adjacent nodes
    this.topRow = nR-2;
    this.rightCol = nC +2;
    this.botRow = nR+2;
    this.leftCol = nC-2;
    
    this.path = 0;
    this.visit = 0;

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
