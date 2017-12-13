/* 
 * Ariel Todoki
 * CS 445 Lab 8
 * A-Maze-ing Race
 */

function collisionDetect(){
    
    
}

collisionDetect.prototype.detect = function(xLoc, zLoc, transx, transz, maze){

    this.x = Math.floor(xLoc + (maze.size - 1)+ (2*transx));
    this.z = Math.floor(zLoc + (maze.size - 1)- (2*transz));

//    console.log("xLoc" + xLoc);
//    console.log("yLoc" + zLoc);
//    console.log(this.x);
//    console.log(this.z);
    
    if(this.x % 2 === 1){
        this.gridX = (this.x+1)/2;
    }
    else{
        this.gridX = this.x/2;
    }
    
    if(this.z %2 === 1){
        this.gridZ = (this.z+1)/2;
    }
    else{
        this.gridZ = this.z/2;
    }
    
//    console.log("gridz" + this.gridZ);
//    console.log("gridx" + this.gridX);
    
    if(this.gridZ <= maze.size-1 && this.gridZ >= 0 && this.gridX <= maze.size-1 && this.gridX >= 0){
    console.log(maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0);
    return maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0; //true if there is a wall
    }
    // checks if running into the walls that surround the maze
    else if(this.gridX === maze.size || this.gridX === -1){ //left or right walls
    //console.log("left or right walls");
    return true; //true if there is a wall
    }
    else if(this.gridZ === maze.size || this.gridZ === -1){ //top or bottom walls
        if(this.gridX !== maze.mazegen.startRow){
            //console.log("top or bottom walls");
            return true;
        }
    }
    else{
        //console.log("NO");
        return false;
    }
};
