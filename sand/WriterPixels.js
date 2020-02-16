/// <reference path="./p5.d/p5.global-mode.d.ts" />

class WriterPixels {
    pixels = [];
    res;

    constructor(res) {
        this.res = res;

        for (let i = 0; i < res; i++) {
            const row = []
            for (let j = 0; j < res; j++) {
                row.push(createVector(i * scale, j * scale, EMPTY))
            }
            this.pixels.push(row)
        }
    }

    set(x, y, newCellType) {
        this.pixels[x][y].z = newCellType
    }

    setEmpty(x, y) {
        this.pixels[x][y].z = EMPTY
    }

    setSand(x, y) {
        this.pixels[x][y].z = SAND
    }

    draw() {
        for (let row of this.pixels) {
            for (let p of row) {
                if (p.z == SAND) {
                    fill(255, 229, 170)
                    noStroke()
                    rect(p.x, p.y, 10, 10)
                }
                if (p.z == WALL) {
                    fill(0, 0, 0)
                    noStroke()
                    rect(p.x, p.y, 10, 10)
                }
                if (p.z == EMPTY) {
                    fill(0, 229, 170)
                    noStroke()
                    rect(p.x, p.y, 10, 10)
                }
            }
        }
    }

    copyFrom(sourcePixels) {
        const newPixels = []
        for (let i = 0; i < res; i++) {
            const row = []
            for (let j = 0; j < res; j++) {
                row.push(sourcePixels[i][j])
            }
            newPixels.push(row)
        }
        this.pixels = newPixels
    }
} 