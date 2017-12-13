/* 
 * Ariel Todoki
 * CS 445 Lab 8
 * A-Maze-ing Race
 * 
 * The detect function finds if there is a wall in the coordinates xLoc and zLoc.
 * It takes transx and transz for how much the maze is translated in the x and z axes
 * from the origin. The maze parameter is the maze object which is being checked for walls.
 */

function collisionDetect() {


}

collisionDetect.prototype.detect = function (xLoc, zLoc, transx, transz, maze) {
    // Floor of x and z coords of location if top left corner cell of maze was was centered at the origin
    this.x = Math.floor(xLoc + (maze.size - 1) + (2 * transx));
    this.z = Math.floor(zLoc + (maze.size - 1) - (2 * transz));

//    console.log("xLoc" + xLoc);
//    console.log("yLoc" + zLoc);
//    console.log(this.x);
//    console.log(this.z);

    // Finds the array indices for the location
    if (this.x % 2 === 1) {
        this.gridX = (this.x + 1) / 2;
    } else {
        this.gridX = this.x / 2;
    }

    if (this.z % 2 === 1) {
        this.gridZ = (this.z + 1) / 2;
    } else {
        this.gridZ = this.z / 2;
    }

//    console.log("gridz" + this.gridZ);
//    console.log("gridx" + this.gridX);

// Checks inner maze walls 
    if (this.gridZ <= maze.size - 1 && this.gridZ >= 0 && this.gridX <= maze.size - 1 && this.gridX >= 0) {
        console.log(maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0);
        return maze.mazegen.grid[this.gridX][this.gridZ].isPath() === 0; //true if there is a wall
    }
    // Checks walls that surround the maze
    else if (this.gridX === maze.size || this.gridX === -1) { //left or right walls
        //console.log("left or right walls");
        return true; //true if there is a wall
    } else if (this.gridZ === maze.size || this.gridZ === -1) { //top or bottom walls
        if (this.gridX !== maze.mazegen.startRow) {
            //console.log("top or bottom walls");
            return true;
        }
    } else {
        //console.log("NO");
        return false;
    }
};
