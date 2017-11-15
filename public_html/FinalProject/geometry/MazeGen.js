/* 
 * Ariel Todoki
 * 
 * Creates a 2D array that represents a maze created using Prim's algorithm
 * References Node.js class
 * 
 * 0 represents a wall
 * 1 represents an open path
 */
function MazeGen(s) {
    this.gridSize = this.setup(s);
    this.makeMaze();
}

MazeGen.prototype.setup = function (s) {
    if (s < 2) { //  minimal size of grid is 4x4
        s = 2;
    } else if (s > 8) { //  maximum size of grid  (change this if you want bigger)
        s = 8;
    }
    g = Math.pow(2, s); // grid size must be a power of 2
    return g;
};

MazeGen.prototype.makeMaze = function () {
    this.grid = new Array(this.gridSize);
    for (var i = 0; i < this.gridSize; i++) {
        this.grid[i] = new Array(this.gridSize).fill(0);
    }

    var startRow = Math.floor(Math.random() * this.gridSize);
    var startCol = Math.floor(Math.random() * this.gridSize);

    this.grid[startRow][startCol] = 1;

    pq = new PriorityQueue();

    if (startRow - 2 >= 0 && this.grid[startRow - 2][startCol] === 0) {
        pq.insert(startRow - 2, startCol, startRow - 1, startCol, Math.floor(Math.random() * 20));
    }
    if (startRow + 2 <= this.gridSize && this.grid[startRow + 2][startCol] === 0) {
        pq.insert(startRow + 2, startCol, startRow + 1, startCol, Math.floor(Math.random() * 20));
    }
    if (startCol - 2 >= 0 && this.grid[startRow][startCol - 2] === 0) {
        pq.insert(startRow, startCol - 2, startRow, startCol - 1, Math.floor(Math.random() * 20));
    }
    if (startCol + 2 <= this.gridSize && this.grid[startRow][startCol + 2] === 0) {
        pq.insert(startRow, startCol + 2, startRow, startCol + 1, Math.floor(Math.random() * 20));
    }

    while (!pq.isEmpty()) {
        // pick a random frontier place from the priority queue
        var frontier = pq.remove();

        var fRow = frontier.getUnit1[0];
        var fCol = frontier.getUnit1[1];
        var wRow = frontier.getUnit2[0];
        var wCol = frontier.getUnit2[1];

        //"knock out" wall connecting frontier place to the current maze
        this.grid[wRow][wCol] = 1;

        //add frontier place to current maze
        this.grid[fRow][fCol] = 1;

        //add the new frontier places to the priority queue
        if (fRow - 2 >= 0 && this.grid[fRow - 2][fCol] === 0) {
            pq.insert(fRow - 2, fCol, fRow - 1, fCol, Math.floor(Math.random() * 20));
        }
        if (fRow + 2 <= this.gridSize && this.grid[fRow + 2][fCol] === 0) {
            pq.insert(fRow + 2, fCol, fRow + 1, fCol, Math.floor(Math.random() * 20));
        }
        if (fCol - 2 >= 0 && this.grid[fRow][fCol - 2] === 0) {
            pq.insert(fRow, fCol - 2, fRow, fCol - 1, Math.floor(Math.random() * 20));
        }
        if (fCol + 2 <= this.gridSize && this.grid[fRow][fCol + 2] === 0) {
            pq.insert(fRow, fCol + 2, fRow, fCol + 1, Math.floor(Math.random() * 20));
        }
    }

};

