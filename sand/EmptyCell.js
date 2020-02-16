class EmptyCell {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    process(pixels) {}

    draw() {
        fill(0, 229, 170)
        noStroke()
        rect(this.x * scale, this.y * scale, scale, scale)
    }
}