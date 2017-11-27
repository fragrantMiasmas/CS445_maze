/* 
 * Ariel Todoki
 * 
 * Creates 3D maze using the 2D array created by MazeGen
 * draws cubes as walls which are designated by a 0 in the 2D array
 * 
 * Maze is of dimension sxs (s should be an odd number)
 */

function Maze(s) {
    mazegen = new MazeGen(s);
    this.name = "maze";
}

Maze.prototype.drawMaze = function () {
    // maze walls
    var centerVal = mazegen.gridSize / 2;
    for (var i = 0; i < mazegen.gridSize; i++) {
        for (var j = 0; j < mazegen.gridSize; j++) {
            if (mazegen.grid[i][j].isPath() === 0) {
                stack.push();
                stack.multiply(translate(i - centerVal, 1.5, j - centerVal));
                stack.multiply(scalem(1,3,1));
                gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
                gl.uniform4fv(uColor, vec4(1, 0, 1, 1));
                gl.uniform1i(uColorMode, 1);
                Shapes.drawPrimitive(Shapes.cube);
                stack.pop();
            }
        }
    }

    // top and bottom walls
    for (var i = -1; i < mazegen.gridSize + 1; i++) {
        if (i !== mazegen.startRow) {
            stack.push();
            stack.multiply(translate(i - centerVal, 1.5, -centerVal - 1));
            stack.multiply(scalem(1,3,1));
            gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
            gl.uniform4fv(uColor, vec4(1, 0, 0, 1));
            gl.uniform1i(uColorMode, 1);
            Shapes.drawPrimitive(Shapes.cube);
            stack.pop();


            stack.push();
            stack.multiply(translate(i - centerVal, 1.5, centerVal));
            stack.multiply(scalem(1,3,1));
            gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
            gl.uniform4fv(uColor, vec4(1, 0, 0, 1));
            gl.uniform1i(uColorMode, 1);
            Shapes.drawPrimitive(Shapes.cube);
            stack.pop();
        }
    }

    // left and right walls
    for (var i = 0; i < mazegen.gridSize; i++) {
        stack.push();
        stack.multiply(translate(-centerVal - 1, 1.5, i - centerVal));
        stack.multiply(scalem(1,3,1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        gl.uniform4fv(uColor, vec4(1, 0, 0, 1));
        gl.uniform1i(uColorMode, 1);
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();

        stack.push();
        stack.multiply(translate(centerVal, 1.5, i - centerVal));
        stack.multiply(scalem(1,3,1));
        gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
        gl.uniform4fv(uColor, vec4(1, 0, 0, 1));
        gl.uniform1i(uColorMode, 1);
        Shapes.drawPrimitive(Shapes.cube);
        stack.pop();
    }

    // draw floor
    stack.push();
    stack.multiply(translate(0,0.1,0));
    stack.multiply(scalem(mazegen.gridSize+1, 0.2, mazegen.gridSize+1));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    gl.uniform4fv(uColor, vec4(0, 1, 0, 1));
    gl.uniform1i(uColorMode, 1);
    Shapes.drawPrimitive(Shapes.cube);
    stack.pop();
};


