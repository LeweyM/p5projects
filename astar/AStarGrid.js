/// <reference path="./p5.global-mode.d.ts" />

class AStarGrid {
    res;
    g;
    finalCell;
    startingCell;
    finished = false

    constructor(res) {
        this.res = res;
        this.initializeGrid()
    }

    setWall(x, y) {
        this.g[XYToIndex(x,y)].setWall()
    }

    hasFinished() {
        return this.finished;
    }

    calculateNextCell() {
        let nextCell = this.getLowestValuedCell()
        nextCell.hasBeenTried = true;
        this.setNeighbourParents(nextCell)
        this.setCurrentRouteHead(nextCell)
        if (nextCell.positionVector.equals(this.finalCell.positionVector)) {
            this.finished = true;
        }
    }

    getLowestValuedCell() {
        const cellsByCostValue = (a, b) => {
            let aHCost = a.positionVector.dist(this.finalCell.positionVector)
            let aGCost = a.positionVector.dist(this.startingCell.positionVector)
            let aCost = aHCost + aGCost
            
            let bHCost = b.positionVector.dist(this.finalCell.positionVector)
            let bGCost = b.positionVector.dist(this.startingCell.positionVector)
            let bCost = bHCost + bGCost

            return aCost - bCost
        }

        let discoveredCells = this.g.filter(c => c.isDiscovered);
        discoveredCells.sort(cellsByCostValue)
        if (discoveredCells.length > 0) {
            return discoveredCells.filter(c => !c.hasBeenTried)[0]
        }
    }

    setNeighbourParents(parentCell) {
        let undiscoveredNeighbours = this.getNeighbours(parentCell).filter(n => !n.isDiscovered)
        for (let n of undiscoveredNeighbours) {
            n.discoverByParent(parentCell)
        }
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
            .filter(c => !c.isWall);
    }

    setStart(x, y) {
        const cell = this.g[XYToIndex(x, y)];
        this.startingCell = cell;
        cell.isStart = true;
        cell.isDiscovered = true;
    }

    setFinish(x, y) {
        const cell = this.g[XYToIndex(x, y)];
        this.finalCell = cell
        cell.isFinish = true;
    }

    draw() {
        for (let cell of this.g) {
            cell.draw()
        }
    }

    initializeGrid() {
        const pixels = [];
        for (let row = 0; row < res; row++) {
            for (let col = 0; col < res; col++) {
                pixels.push(cellFromPosition(col, row))
            }
        }
        this.g = pixels
        function randInGrid() {
            return round(random(1, res - 2));
        }
        this.setStart(randInGrid(),randInGrid())
	    this.setFinish(randInGrid(),randInGrid())
    }
}

function cellFromPosition(row, col) {
    const scale = 400 / res;
    const vec = createVector(row * scale, col * scale);
    return new Cell(row, col, vec);
}

function XYToIndex(x, y) {
    if (x < 0 || x >= res || y < 0 || y >= res) return null
    return (y * res) + x;
}
