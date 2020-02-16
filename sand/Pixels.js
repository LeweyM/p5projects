class Pixels {

    pixels = [];
    res;

    constructor(res) {
        this.res = res;
        this.pixels = createNewPixelGrid((x, y) => createVector(x * scale, y * scale, EMPTY))
    }

    copyFrom(sourcePixels) {
        this.pixels = createNewPixelGrid((x, y) => sourcePixels[x][y])
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