/* 
 * Ariel Todoki
 * CS 445 Graphics
 * Lab 8 (Final)
 * The A-maze-ing Race
 * 
 * Creates a 2D array of nodes that represents a maze
 * Uses recursive backtracking algorithm
 * References Node.js class
 * 
 * 0 represents a wall
 * 1 represents an open path
 */
function MazeGen(s) {
    this.gridSize = this.setup(s);
    this.makeMaze();
    //this.print();
}

MazeGen.prototype.setup = function (s) {
    if (s < 5) { //  minimal size of grid is 5x5
        s = 5;
    } else if (s > 31) { //  maximum size of grid  (change this if you want bigger)
        s = 31;
    }

    return s;
};

MazeGen.prototype.makeMaze = function () {
    //create 2D array of Nodes
    this.grid = new Array(this.gridSize);
    for (var i = 0; i < this.gridSize; i++) {
        this.grid[i] = new Array(this.gridSize).fill(0);
    }

    for (var i = 0; i < this.gridSize; i++) {
        for (var j = 0; j < this.gridSize; j++) {
            this.grid[i][j] = new Node(i, j);
        }
    }

    //pick random starting node along one side
    this.startRow = Math.floor(Math.random() * this.gridSize);
    this.startCol = 0;

    var startNode = this.grid[this.startRow][this.startCol];
    startNode.setPath();
//    console.log("start row: " + this.startRow);
//    console.log("start col: " + this.startCol);

    numNodes = 0;
    this.recursive(startNode);


};


MazeGen.prototype.recursive = function (currNode) {

    var currNumNodes = 0;
    //top node
    if (currNode.getTopRow() >= 0 && this.grid[currNode.getTopRow()][currNode.getCol()].isPath() === 0) {
        currNumNodes++;
        if (this.grid[currNode.getTopRow()][currNode.getCol()].isVisit() === 0) {
            this.grid[currNode.getTopRow()][currNode.getCol()].setVisit();
            numNodes++;
        }
    }

    //right node
    if (currNode.getRightCol() < this.gridSize && this.grid[currNode.getRow()][currNode.getRightCol()].isPath() === 0) {
        currNumNodes++;
        if (this.grid[currNode.getRow()][currNode.getRightCol()].isVisit() === 0) {
            this.grid[currNode.getRow()][currNode.getRightCol()].setVisit();
            numNodes++;
        }
    }

    //bottom node
    if (currNode.getBotRow() < this.gridSize && this.grid[currNode.getBotRow()][currNode.getCol()].isPath() === 0) {
        currNumNodes++;
        if (this.grid[currNode.getBotRow()][currNode.getCol()].isVisit() === 0) {
            this.grid[currNode.getBotRow()][currNode.getCol()].setVisit();
            numNodes++;
        }
    }

    //left node
    if (currNode.getLeftCol() >= 0 && this.grid[currNode.getRow()][currNode.getLeftCol()].isPath() === 0) {
        currNumNodes++;
        if (this.grid[currNode.getRow()][currNode.getLeftCol()].isVisit() === 0) {
            this.grid[currNode.getRow()][currNode.getLeftCol()].setVisit();
            numNodes++;
        }
    }

    var topNode;
    var rightNode;
    var botNode;
    var leftNode;

    if (numNodes > 0) {
        while (currNumNodes > 0) {
            var flag = 0;
            while (flag === 0) {
                switch (Math.floor(Math.random() * 4)) {
                    case 0:
                        if (currNode.getTopRow() >= 0) {
                            topNode = this.grid[currNode.getTopRow()][currNode.getCol()];
                            if (topNode.isVisit() === 1 && topNode.isPath() === 0) {
                                var wallRow = currNode.getRow() - 1;
                                this.grid[wallRow][currNode.getCol()].setPath();
                                topNode.setPath();
                                numNodes--;
                                flag = 1;
                                //console.log("case0");
                                console.log(currNode.getTopRow());
                                this.recursive(topNode);
                                //recalculate currNumNodes
                                currNumNodes = this.calcCurrNumNodes(currNode);
                            }
                        }
                        break;
                    case 1:
                        if (currNode.getRightCol() < this.gridSize) {
                            rightNode = this.grid[currNode.getRow()][currNode.getRightCol()];
                            if (rightNode.isVisit() === 1 && rightNode.isPath() === 0) {
                                var wallCol = currNode.getCol() + 1;
                                this.grid[currNode.getRow()][wallCol].setPath();
                                rightNode.setPath();
                                numNodes--;
                                flag = 1;
                                //console.log("case1");
                                console.log(currNode.getRightCol());
                                this.recursive(rightNode);
                                currNumNodes = this.calcCurrNumNodes(currNode);
                            }
                        }
                        break;
                    case 2:
                        if (currNode.getBotRow() < this.gridSize) {
                            botNode = this.grid[currNode.getBotRow()][currNode.getCol()];
                            if (botNode.isVisit() === 1 && botNode.isPath() === 0) {
                                var wallRow = currNode.getRow() + 1;
                                this.grid[wallRow][currNode.getCol()].setPath();
                                botNode.setPath();
                                numNodes--;
                                flag = 1;
                                //console.log("case2");
                                console.log(currNode.getBotRow());
                                this.recursive(botNode);
                                currNumNodes = this.calcCurrNumNodes(currNode);
                            }
                        }
                        break;
                    case 3:
                        if (currNode.getLeftCol() >= 0) {
                            leftNode = this.grid[currNode.getRow()][currNode.getLeftCol()];
                            if (leftNode.isVisit() === 1 && leftNode.isPath() === 0) {
                                var wallCol = currNode.getCol() - 1;
                                this.grid[currNode.getRow()][wallCol].setPath();
                                leftNode.setPath();
                                numNodes--;
                                flag = 1;
                                //console.log("case3");
                                console.log(currNode.getLeftCol());
                                this.recursive(leftNode);
                                currNumNodes = this.calcCurrNumNodes(currNode);
                            }
                        }
                        break;
                }

            }
        }
    }

};

MazeGen.prototype.calcCurrNumNodes = function (currNode) {
    var currNumNodes = 0;
    //top node
    if (currNode.getTopRow() >= 0 && this.grid[currNode.getTopRow()][currNode.getCol()].isPath() === 0) {
        currNumNodes++;

    }

    //right node
    if (currNode.getRightCol() < this.gridSize && this.grid[currNode.getRow()][currNode.getRightCol()].isPath() === 0) {
        currNumNodes++;
    }

    //bottom node
    if (currNode.getBotRow() < this.gridSize && this.grid[currNode.getBotRow()][currNode.getCol()].isPath() === 0) {
        currNumNodes++;
    }

    //left node
    if (currNode.getLeftCol() >= 0 && this.grid[currNode.getRow()][currNode.getLeftCol()].isPath() === 0) {
        currNumNodes++;
    }
    return currNumNodes;
};


MazeGen.prototype.print = function () {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid.length; j++) {
            console.log(this.grid[i][j].isPath());
        }
        console.log("\n");
    }
};

