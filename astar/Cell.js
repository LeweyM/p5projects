/// <reference path="./p5.global-mode.d.ts" />

class Cell {
    x;
    y;
    positionVector;
    isStart = false;
    isFinish = false;
    isDiscovered = false;
    hasBeenTried = false;
    isRoute = false;
    isWall = false;
    parent = null;
    g = Infinity
    h = Infinity

    constructor(x, y, positionVector) {
        this.x = x;
        this.y = y;
        this.positionVector = positionVector
    }

    discoverByParent(parentCell) {
        this.parent = parentCell;
        this.isDiscovered = true;
    }
    
    setRouteHead() {
        if (this.isStart) return
        this.isRoute = true;
        this.parent && this.parent.setRouteHead()
    }

    setWall() {
        this.isWall = true;
    }

    draw() {

        if (this.isStart) {
            let posVec = this.positionVector;
            stroke(0);
            fill(255)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
            noStroke()
            fill(50)
            textAlign(CENTER,CENTER)
            textSize(400/res/2)
            text("S", posVec.x, posVec.y, 400/res, 400/res)
        } else if (this.isFinish) {
            let posVec = this.positionVector;
            stroke(0);
            fill(255)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
            noStroke()
            fill(50)
            textAlign(CENTER,CENTER)
            textSize(400/res/2)
            text("F", posVec.x, posVec.y, 400/res, 400/res)
        } else if (this.isWall) {
            let posVec = this.positionVector;
            stroke(0);
            fill(0)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        }else if (this.isRoute) {
            let posVec = this.positionVector;
            stroke(0);
            fill(202,0,42)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        } else if (this.hasBeenTried) {
            let posVec = this.positionVector;
            stroke(0);
            fill(80,220,100)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        } else if (this.isDiscovered) {
            let posVec = this.positionVector;
            stroke(0);
            fill(220)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        } else {
            let posVec = this.positionVector;
            stroke(0)
            fill(100, posVec.x, posVec.y);
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        }

        if (this.parent) {
            let posVec = this.positionVector;
            let scale = 400 / res
            let len = scale / 2
            let parentVec = this.parent.positionVector

            stroke(255,255,0)
            line(posVec.x + len, posVec.y + len, parentVec.x + len, parentVec.y + len)
        }

        if (this.g != Infinity) {
            let posVec = this.positionVector;
            fill(125)
            stroke(125)
            textAlign(RIGHT,TOP)
            textSize(400/res/5)
            text("g:" + (this.g).toFixed(1), posVec.x, posVec.y, 400/res, 400/res)
        }
        if (this.h != Infinity) {
            let posVec = this.positionVector;
            fill(125)
            stroke(125)
            textAlign(LEFT,BOTTOM)
            textSize(400/res/5)
            text("h:" + (this.h).toFixed(1), posVec.x, posVec.y, 400/res, 400/res)
        }
        if (this.h != Infinity && this.g != Infinity) {
            let posVec = this.positionVector;
            fill(125)
            stroke(125)
            textAlign(CENTER,CENTER)
            textSize(400/res/5)
            text("c:" + (this.h + this.g).toFixed(1), posVec.x, posVec.y, 400/res, 400/res)
        }
    }

    


}