const getCellType = (num) => {
    const map = {
        1: SAND,
        2: WALL
    }
    return map[num] || EMPTY
}

class Pixels {
    pixels;
    changedPixels;
    res;
    
    constructor(res) {
        this.pixels = createNewPixelGrid((x, y) => createVector(x * scale, y * scale, EMPTY))
        this.changedPixels = new ChangedPixels()
        this.res = res;
    }

    swap(x, y, x2, y2) {
        const pixelsHaveAlreadyChanged = this.changedPixels.hasChanged(x, y) || this.changedPixels.hasChanged(x2, y2);
        if (pixelsHaveAlreadyChanged) return;

        const source = this.pixels[x][y].z
        const target = this.pixels[x2][y2].z
        this.pixels[x][y].z = target
        this.pixels[x2][y2].z = source

        this.changedPixels.set(x, y)
        this.changedPixels.set(x2, y2)
    }

    set(x, y, newCellType) {
        this.pixels[x][y].z = newCellType
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

    processSand(x, y) {
        if (this.isSand(x, y) && this.notLastRow(y)) {
            if (this.isPixelEmpty(x, y + 1)) {
                this.moveCellDown(x, y)
            } else if (this.isPixelEmpty(x - 1, y + 1) && this.isPixelEmpty(x - 1, y)) {
                this.moveCellDownLeft(x, y)
            } else if (this.isPixelEmpty(x + 1, y + 1) && this.isPixelEmpty(x + 1, y)) {
                this.moveCellDownRight(x, y)
            }
        }
    }

    process() {
        for (var i = res - 1; i >= 0; i--) {
            for (var j = res - 1; j >= 0; j--) {
                pixels.processSand(i, j)
            }
        }
        this.changedPixels.reset()
    }
    
    moveCellDown(x, y) {
        this.swap(x, y, x, y+1)
    }
    
    moveCellDownLeft(x, y) {
        this.swap(x, y, x-1, y+1)
    }
    
    moveCellDownRight(x, y) {
        this.swap(x, y, x+1, y+1)
    }
    
    isPixelEmpty(x, y) {
        return this.isEmpty(x, y)
    }
    
    notLastRow(y) {
        return y < res - 1
    }

    draw(offset = 0) {
        for (let row of this.pixels) {
            for (let p of row) {
                if (p.z == SAND) {
                    fill(255, 229, 170)
                    noStroke()
                    rect(p.x + offset, p.y, scale, scale)
                }
                if (p.z == WALL) {
                    fill(0, 0, 0)
                    noStroke()
                    rect(p.x + offset, p.y, scale, scale)
                }
                if (p.z == EMPTY) {
                    fill(0, 229, 170)
                    noStroke()
                    rect(p.x + offset, p.y, scale, scale)
                }
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