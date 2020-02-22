/// <reference path="./p5.global-mode.d.ts" />

class Grid {
    res;
    g;

    constructor(res) {
        this.initiateGrid(res)
    }

    setStart(x, y) {
        this.g[x][y].isStart = true;
    }

    setFinish(x, y) {
        this.g[x][y].isFinish = true;
    }

    draw() {
        for (let col = 0; col < res; col++) {
            for (let row = 0; row < res; row++) {
                let cell = this.g[col][row];
                if (cell.isStart) {
                    let posVec = this.g[col][row].positionVector;
                    stroke(0);
                    fill(255)
                    rect(posVec.x, posVec.y, 400 / res, 400 / res);
                    noStroke()
                    fill(50)
                    textAlign(CENTER,CENTER)
                    textSize(400/res/2)
                    text("S", posVec.x, posVec.y, 400/res, 400/res)
                } else if (cell.isFinish) {
                    let posVec = this.g[col][row].positionVector;
                    stroke(0);
                    fill(255)
                    rect(posVec.x, posVec.y, 400 / res, 400 / res);
                    noStroke()
                    fill(50)
                    textAlign(CENTER,CENTER)
                    textSize(400/res/2)
                    text("F", posVec.x, posVec.y, 400/res, 400/res)
                } else {
                    let posVec = this.g[col][row].positionVector;
                    stroke(0)
                    fill(100, posVec.x, posVec.y);
                    rect(posVec.x, posVec.y, 400 / res, 400 / res);
                }
            }
        }
    }

    initiateGrid(res) {
        const scale = 400/res
        const pixels = [];
        for (let i = 0; i < res; i++) {
            let row = []
            for (let j = 0; j < res; j++) {
                const vec = createVector(i * scale, j * scale);
                row.push(new Cell(vec))
            }
            pixels.push(row)
        }
        this.g = pixels
    }
}