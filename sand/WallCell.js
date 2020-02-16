class WallCell {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    process(pixels) {}

    draw() {
        fill(0, 0, 0)
        noStroke()
        rect(p.x + offset, p.y, scale, scale)
    }
}