/* 
 * Ariel Todoki and Elizabeth Reed
 * 
 * Creates 3D maze using the 2D array created by MazeGen
 * draws cubes as walls which are designated by a 0 in the 2D array
 * 
 * Maze is of dimension sxs (s should be an odd number)
 */

function Maze(s) {
    
    this.name = "maze";
    if(s%2 === 0){ //checks if an even number was entered for the dimensions
        this.size = s+1;
    }
    else{
        this.size = s;
    }
    this.mazegen = new MazeGen(this.size);
}

Maze.prototype.drawMaze = function () {
    // maze walls
    var centerVal = (this.mazegen.gridSize-1) / 2;
    for (var i = 0; i < this.mazegen.gridSize; i++) {
        for (var j = 0; j < this.mazegen.gridSize; j++) {
            if (this.mazegen.grid[i][j].isPath() === 0) {
                stack.push();
                stack.multiply(translate(i - centerVal, 1.5, j - centerVal));
                stack.multiply(scalem(1,3,1));
                gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
                gl.uniform4fv(uColor, vec4(0, 102/255, 102/255, 1));
                gl.uniform1i(uColorMode, 1);
                Shapes.drawPrimitive(Shapes.cube);
                stack.pop();
            }
        }
    }

    // top and bottom walls
    for (var i = 0; i < this.mazegen.gridSize + 2; i++) {
        if (i-1 !== this.mazegen.startRow) {
            stack.push();
            stack.multiply(translate(i -1- centerVal, 1.5, -centerVal - 1));
            stack.multiply(scalem(1,3,1));
            gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
            gl.uniform4fv(uColor, vec4(211/255, 36/255, 6/255, 1));
            gl.uniform1i(uColorMode, 1);
            Shapes.drawPrimitive(Shapes.cube);
            stack.pop();


            stack.push();
            stack.multiply(translate(i -1- centerVal, 1.5, centerVal+1));
            stack.multiply(scalem(1,3,1));
            gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
            gl.uniform4fv(uColor, vec4(211/255, 36/255, 6/255, 1));
            gl.uniform1i(uColorMode, 1);
            Shapes.drawPrimitive(Shapes.cube);
            stack.pop();
        }
    }

    // left and right walls
    for (var i = 0; i < this.mazegen.gridSize; i++) {
        stack.push();
        stack.multiply(translate(-centerVal - 1, 1.5, i - centerVal));
        stack.multiply(scalem(1,3,1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        gl.uniform4fv(uColor, vec4(211/255, 36/255, 6/255, 1));
        gl.uniform1i(uColorMode, 1);
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();

        stack.push();
        stack.multiply(translate(centerVal +1, 1.5, i - centerVal));
        stack.multiply(scalem(1,3,1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        gl.uniform4fv(uColor, vec4(211/255, 36/255, 6/255, 1));
        gl.uniform1i(uColorMode, 1);
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    }

    // draw floor
    stack.push();
    stack.multiply(translate(0,0.1,0));
    stack.multiply(scalem(this.mazegen.gridSize+1, 0.2, this.mazegen.gridSize+1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(1, 1, 1, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
    
    //roof if checkbox is not checked, note that it's kind of slow
    var check = document.getElementById("showMaze").checked;
    if (!check) {
        stack.push();
        stack.multiply(translate(0, 3, 0));
        stack.multiply(scalem(this.mazegen.gridSize + 1, 0.2, this.mazegen.gridSize + 1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        gl.uniform4fv(uColor, vec4(1, 1, 1, 1));
        gl.uniform1i(uColorMode, 1);
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    }
    
};


