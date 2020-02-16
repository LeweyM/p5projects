/// <reference path="./p5.d/p5.global-mode.d.ts" />

class ReferencePixels {
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

    isEmpty(x, y) {
        return this.seePixel(x, y) == EMPTY
    }

    isSand(x, y) {
        return this.seePixel(x, y) == SAND
    }

    seePixel(x, y) {
        const withinGrid = x >= 0 && y >= 0 && x < res && y < res;
        return withinGrid ? this.pixels[x][y].z : WALL
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