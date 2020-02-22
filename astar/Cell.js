/// <reference path="./p5.global-mode.d.ts" />

class Cell {
    x;
    y;
    positionVector;
    isStart = false;
    isFinish = false;
    isDiscovered = false;
    isRoute = false;
    parent = null;

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
        this.isRoute = true;
        this.parent && this.parent.setRouteHead()
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
        } else if (this.isRoute) {
            let posVec = this.positionVector;
            stroke(0);
            fill(202,0,42)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        } else if (this.isDiscovered) {
            let posVec = this.positionVector;
            stroke(0);
            fill(20,20,20)
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        } else {
            let posVec = this.positionVector;
            stroke(0)
            fill(100, posVec.x, posVec.y);
            rect(posVec.x, posVec.y, 400 / res, 400 / res);
        }
    }


}