/// <reference path="./p5.global-mode.d.ts" />

class AStarGrid {
    res;
    g;
    finalCell;
    startingCell;
    finished = false;
    costQueue;
    retrievedFromQueue;

    constructor(res) {
        this.res = res;
        this.costQueue = new BinaryHeap((o) => o.cost);
        this.retrievedFromQueue = [];
        this.initializeGrid()
    }

    setWall(x, y) {
        this.g[XYToIndex(x,y)].setWall()
    }

    hasFinished() {
        return this.finished;
    }

    fastestRoute() {
        console.time("calculation")
        while (!this.finished) {
            this.calculateNextCell()
        }
        console.timeEnd("calculation")
    }

    calculateNextCell() {
        let nextCell = this.getLowestValuedCell()

        if (!nextCell) {
            this.finished = true;
            return;
        }

        this.discoverNeighbours(nextCell)
        this.calculateNeighbours(nextCell)
        
        if (nextCell == this.finalCell) {
            this.setCurrentRouteHead(nextCell)
            this.finished = true;
        }
    }

    getLowestValuedCellOLD() {
        const cellsByCost = (a, b) => {
            let aCost = a.g + a.h
            let bCost = b.g + b.h
            return aCost - bCost
        }
        
        let cellsToTry = this.g
            .filter(c => c.isDiscovered)
            .filter(c => !c.hasBeenTried)
            .sort(cellsByCost)
        
        if (cellsToTry.length <= 0) return false

        return cellsToTry[0]
    }

    getLowestValuedCell() {
        let costObject = this.costQueue.pop()
        if (!costObject) return null;

        while (this.retrievedFromQueue[costObject.index]) {
            costObject = this.costQueue.pop();
            if (!costObject) return null;
        }
        this.retrievedFromQueue[costObject.index] = true

        return this.g[costObject.index]
    }

    calculateNeighbours(parentCell) {
        parentCell.hasBeenTried = true;
        this.getNeighbours(parentCell)
            .filter(c => !c.hasBeenTried)
            .forEach(cell => {
                let g = parentCell.g + dist(parentCell.x, parentCell.y, cell.x, cell.y);
                let h = dist(this.finalCell.x, this.finalCell.y, cell.x, cell.y)
                if (g < cell.g) {
                    cell.g = g;
                    cell.parent = parentCell
                }
                cell.h = h;

                let cellCostObject = {index: XYToIndex(cell.x, cell.y), cost: g + h}
                this.costQueue.push(cellCostObject)
            })
    }

    discoverNeighbours(parentCell) {
        this.getNeighbours(parentCell)
            .filter(c => !c.isDiscovered)
            .filter(c => !c.hasBeenTried)
            .forEach(c => c.discoverByParent(parentCell))
    }

    setCurrentRouteHead(headCell) {
        for (let c of this.g) {
            c.isRoute = false;
        }
        headCell.setRouteHead()
    }

    getNeighbours(cell) {
        const x = cell.x
        const y = cell.y
        const n = [];
        n.push(this.g[XYToIndex(x + 1, y + 1)])
        n.push(this.g[XYToIndex(x + 1, y)])
        n.push(this.g[XYToIndex(x + 1, y - 1)])
        n.push(this.g[XYToIndex(x, y + 1)])
        n.push(this.g[XYToIndex(x, y - 1)])
        n.push(this.g[XYToIndex(x - 1, y + 1)])
        n.push(this.g[XYToIndex(x - 1, y)])
        n.push(this.g[XYToIndex(x - 1, y - 1)])
        return n
            .filter(c => !!c)
            .filter(c => !c.isWall)
    }

    setStart(x, y) {
        const cell = this.g[XYToIndex(x, y)];
        cell.isStart = true;
        cell.isDiscovered = true;
        cell.g = 0
        this.startingCell = cell;
    }
    
    setFinish(x, y) {
        const cell = this.g[XYToIndex(x, y)];
        if (cell.isWall) return

        this.resetNonWallGrid()
        cell.isFinish = true;
        cell.h = 0
        this.finalCell = cell

        const distanceFromStart = dist(this.startingCell.x, this.startingCell.y, this.finalCell.x, this.finalCell.y);
        this.startingCell.h = distanceFromStart

        let startingCellCostObject = {index: XYToIndex(this.startingCell.x, this.startingCell.y), cost: distanceFromStart}
        this.costQueue.push(startingCellCostObject)
    }

    draw() {
        for (let cell of this.g) {
            cell.draw()
        }
    }

    resetNonWallGrid() {
        this.g
            .filter(c => !c.isWall)
            .filter(c => !c.isStart)
            .forEach(c => {
                c.g = Infinity
                c.h = Infinity
                c.isFinish = false;
                c.isDiscovered = false;
                c.hasBeenTried = false;
                c.isRoute = false;
                c.parent = null;
            })
        this.startingCell.isDiscovered = true;
        this.startingCell.hasBeenTried = false;
        this.finished = false;
        this.costQueue = new BinaryHeap((o => o.cost))
        this.retrievedFromQueue = []
    }

    initializeGrid() {
        const pixels = [];
        for (let row = 0; row < res; row++) {
            for (let col = 0; col < res; col++) {
                pixels.push(cellFromPosition(col, row))
            }
        }
        this.g = pixels
        this.setStart(0,0)
        this.setFinish(res-1,res-1)
    }
}

function cellFromPosition(row, col) {
    const scale = canvasSize / res;
    const vec = createVector(row * scale, col * scale);
    return new Cell(row, col, vec);
}

function XYToIndex(x, y) {
    if (x < 0 || x >= res || y < 0 || y >= res) return null
    return (y * res) + x;
}
