/// <reference path="./p5.d/p5.global-mode.d.ts" />

const getCellType = (num) => {
    const map = {
        1: SAND,
        2: WALL
    }
    return map[num] || EMPTY
}

class ReferencePixels extends Pixels {
    constructor(res) {
        super(res)
    }


    isEmpty(x, y) {
        return this.seePixel(x, y) == EMPTY
    }

    isSand(x, y) {
        return this.seePixel(x, y) == SAND
    }

    seePixel(x, y) {
        const withinGrid = x >= 0 && y >= 0 && x < res && y < res;
        return withinGrid ? getCellType(this.pixels[x][y].z) : WALL
    }
} 