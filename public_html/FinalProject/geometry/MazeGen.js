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
    this.print();
}

MazeGen.prototype.setup = function (s) {
    if (s < 2) { //  minimal size of grid is 4x4
        s = 2;
    } else if (s > 8) { //  maximum size of grid  (change this if you want bigger)
        s = 8;
    }
    g = Math.pow(2, s); // grid size must be a power of 2
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

    //pick random starting node
    var startRow = 4;//Math.floor(Math.random() * this.gridSize);
    var startCol = 0;//Math.floor(Math.random()* this.gridSize);

    var startNode = this.grid[startRow][startCol];
    startNode.setPath();
    console.log("start row: " + startRow);
    console.log("start col: " + startCol);

    numNodes = 0;
    this.recursive(startNode);


};

MazeGen.prototype.recursive2 = function(currNode){
    //find and mark frontier nodes
    
    //if there is one, pick one
    //recursive2(frontierNode)
    
    //else if there is another frontier node, pick one
    //recursive2(frontierNode)
}

MazeGen.prototype.recursive = function (currNode) {
    //var numNodes = 0;
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

    console.log("num Nodes" + numNodes);
    console.log("currNumNodes" + currNumNodes);
    //pick random frontier node
    var topNode;
    var rightNode;
    var botNode;
    var leftNode;

    if (numNodes > 0) {
        while (currNumNodes > 0) {
            //for(var n = 0; n < numNodes; n++){
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
                                //call recursive function (startNode.topNode)

                                flag = 1;
                                console.log("case0");
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
                                //call recursive function (startNode.rightNode)
                                //this.recursive(rightNode);
                                flag = 1;
                                console.log("case1");
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
                                // call recursive function (startNode.botNode)
                                //this.recursive(botNode);
                                flag = 1;
                                console.log("case2");
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
                                // call recursive function (startNode.leftNode)
                                //this.recursive(leftNode);
                                flag = 1;
                                console.log("case3");
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

//MazeGen.prototype.chooseRandNode = function(row,col){
//    var currNode = this.grid[row][col];
//    var flag = 0;
//    
//    while(flag === 0){
//        switch(Math.random()*4){
//            case 0:
//                if(currNode.getTopRow() <= 0 && this.grid[row-2][col].isPath === 0){
//                    
//                }
//        }
//    }
//};

//MazeGen.prototype.makeMaze = function () {
//    this.grid = new Array(this.gridSize);
//    for (var i = 0; i < this.gridSize; i++) {
//        this.grid[i] = new Array(this.gridSize).fill(0);
//    }
//
//    var startRow = Math.floor(Math.random() * this.gridSize);
//    var startCol = Math.floor(Math.random() * this.gridSize);
//
//    this.grid[startRow][startCol] = 1;
//
//    pq = new PriorityQueue();
//
//    if ((startRow - 2) >= 0) {
//        console.log("here1");
//        if (this.grid[startRow - 2][startCol] === 0) {
//            pq.insert(startRow - 2, startCol, Math.floor(Math.random() * 20));
//            
//        }
//    }
//    if ((startRow + 2) < this.gridSize) {
//        if (this.grid[startRow + 2][startCol] === 0) {
//            pq.insert(startRow + 2, startCol, Math.floor(Math.random() * 20));
//            console.log("here2");
//        }
//    }
//    if ((startCol - 2) >= 0) {
//        if (this.grid[startRow][startCol - 2] === 0) {
//            pq.insert(startRow, startCol - 2, Math.floor(Math.random() * 20));
//            console.log("here3");
//        }
//    }
//    if ((startCol + 2) < this.gridSize) {
//        if (this.grid[startRow][startCol + 2] === 0) {
//            pq.insert(startRow, startCol + 2, Math.floor(Math.random() * 20));
//            console.log("here4");
//        }
//    }
//
//    while (!pq.isEmpty()) {
//        // pick a random frontier place from the priority queue
//        var frontier = pq.remove();
//        console.log(frontier);
//        
//        var fRow = frontier.getRow();
//        var fCol = frontier.getCol();
////        var wRow = frontier.getval3();
////        var wCol = frontier.getval4();
//
//        //add frontier place to current maze
//        this.grid[fRow][fCol] = 1;
//        
//        //"knock out" wall connecting frontier place to the current maze
//        //this.grid[wRow][wCol] = 1;
//        var rand = Math.floor(Math.random()*4);
//        var flag = 0;
//        while(flag === 0){
//        switch(rand){
//            case 0:
//                if((fRow-2) >= 0){
//                    if(this.grid[fRow-2][fCol] === 1){
//                        this.grid[fRow-1][fCol] = 1;
//                        flag = 1;
//                        break;
//                    }
//                }
//            case 1:
//                if((fRow+2) < this.gridSize){
//                    if(this.grid[fRow+2][fCol] === 1){
//                        this.grid[fRow+1][fCol] = 1;
//                        flag = 1;
//                        break;
//                    }
//                }
//            case 2:
//                if((fCol-2) >= 0){
//                    if(this.grid[fRow][fCol-2] === 1){
//                        this.grid[fRow][fCol-1] = 1;
//                        flag = 1;
//                        break;
//                    }
//                }
//            case 3:
//                if((fCol+2) < this.gridSize){
//                    if(this.grid[fRow][fCol+2] === 1){
//                        this.grid[fRow][fCol+1] = 1;
//                        flag = 1;
//                        break;
//                    }
//                }
//        }
//    }
//
//        //add the new frontier places to the priority queue
//        if ((fRow - 2) >= 0) {
//            if (this.grid[fRow - 2][fCol] === 0) {
//                pq.insert(fRow - 2, fCol, Math.floor(Math.random() * 20));
//            }
//        }
//        if ((fRow + 2) < this.gridSize) {
//            if (this.grid[fRow + 2][fCol] === 0) {
//                pq.insert(fRow + 2, fCol,  Math.floor(Math.random() * 20));
//            }
//        }
//        if ((fCol - 2) >= 0) {
//            if (this.grid[fRow][fCol - 2] === 0) {
//                pq.insert(fRow, fCol - 2,  Math.floor(Math.random() * 20));
//            }
//        }
//        if ((fCol + 2) < this.gridSize) {
//            if (this.grid[fRow][fCol + 2] === 0) {
//                pq.insert(fRow, fCol + 2,  Math.floor(Math.random() * 20));
//            }
//        }
//    }
//
//};

MazeGen.prototype.print = function () {
    for (var i = 0; i < this.grid.length; i++) {
        for (var j = 0; j < this.grid.length; j++) {
            console.log(this.grid[i][j].isPath());
        }
        console.log("\n");
    }
};

