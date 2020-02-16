/// <reference path="./p5.d/p5.global-mode.d.ts" />

class WriterPixels extends Pixels{
    constructor(res) {
        super(res)
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
} 