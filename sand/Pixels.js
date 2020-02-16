class Pixels {
    pixels;
    changedPixels;
    res;

    constructor(res) {
        this.pixels = createNewPixelGrid((x, y) => new EmptyCell(x, y))
        this.changedPixels = new ChangedPixels()
        this.res = res;
    }

    swap(x, y, x2, y2) {
        if (this.changedPixels.hasChanged(x, y)
            || this.changedPixels.hasChanged(x2, y2)) return;

        function cellFactory(cell, x, y) {
            if (cell instanceof SandCell) {
                return new SandCell(x, y)
            }
            if (cell instanceof EmptyCell) {
                return new EmptyCell(x, y)
            }
            if (cell instanceof WallCell) {
                return new WallCell(x, y)
            }
        }

        const source = this.pixels[x][y]
        const target = this.pixels[x2][y2]
        this.pixels[x][y] = cellFactory(target, x, y)
        this.pixels[x2][y2] = cellFactory(source, x2, y2)

        this.changedPixels.set(x, y)
        this.changedPixels.set(x2, y2)
    }

    set(x, y, newCellType) {
        this.pixels[x][y] = newCellType
    }

    isEmpty(x, y) {
        return this.seePixel(x, y) instanceof EmptyCell
    }

    isSand(x, y) {
        return this.seePixel(x, y) instanceof SandCell
    }

    seePixel(x, y) {
        return this.isWithinGrid(x, y)
            ? this.pixels[x][y]
            : new WallCell(x, y)
    }

    isWithinGrid(x, y) {
        return x >= 0 && y >= 0 && x < res && y < res;
    }

    process() {
        for (var y = res - 1; y >= 0; y--) {
            for (var x = res - 1; x >= 0; x--) {
                this.notLastRow(y) && this.pixels[x][y].process(this)
            }
        }
        this.changedPixels.reset()
    }

    notLastRow(y) {
        return y < res - 1
    }

    draw(offset = 0) {
        for (let row of this.pixels) {
            for (let p of row) {
                p.draw()
            }
        }
    }
}

const createNewPixelGrid = (proc) => {
    const newPixels = []
    for (let i = 0; i < res; i++) {
        const row = []
        for (let j = 0; j < res; j++) {
            row.push(proc(i, j))
        }
        newPixels.push(row)
    }
    return newPixels
}