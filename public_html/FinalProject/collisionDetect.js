/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function collisionDetect(){
    
    
}

collisionDetect.prototype.detect = function(xLoc, zLoc, maze){
    this.x = Math.floor(xLoc + (maze.size - 1));
    this.z = Math.floor(zLoc + (maze.size - 1));
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
    
    console.log(this.gridZ);
    console.log(this.gridX);
    
    if(this.gridZ <= maze.size-1 && this.gridZ >= 0 && this.gridX <= maze.size-1 && this.gridX >= 0){
    console.log(maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0);
    return maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0; //true if there is a wall
    }
    else{
        console.log("NO");
        return false;
    }
};