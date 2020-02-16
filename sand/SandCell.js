class SandCell {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    process(pixels) {
        if (this.isPixelEmpty(this.x, this.y + 1, pixels)) {
            this.moveCellDown(this.x, this.y, pixels)
        } else if (this.isPixelEmpty(this.x - 1, this.y + 1, pixels) && this.isPixelEmpty(this.x - 1, this.y, pixels)) {
            this.moveCellDownLeft(this.x, this.y, pixels)
        } else if (this.isPixelEmpty(this.x + 1, this.y + 1, pixels) && this.isPixelEmpty(this.x + 1, this.y, pixels)) {
            this.moveCellDownRight(this.x, this.y, pixels)
        }
    }

    moveCellDown(x, y, pixels) {
        pixels.swap(x, y, x, y+1)
    }
    
    moveCellDownLeft(x, y, pixels) {
        pixels.swap(x, y, x-1, y+1)
    }
    
    moveCellDownRight(x, y, pixels) {
        pixels.swap(x, y, x+1, y+1)
    }

    isPixelEmpty(x, y, pixels) {
        return pixels.isEmpty(x, y)
    }

    draw() {
        fill(255, 229, 170)
        noStroke()
        rect(this.x * scale, this.y * scale, scale, scale)
    }
}