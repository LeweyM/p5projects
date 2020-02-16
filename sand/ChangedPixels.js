class ChangedPixels {
    changedPixels

    constructor() {
        this.reset();
    }

    set(x, y) {
        const index = (y * res) + x;
        this.changedPixels[index] = true;
    }

    hasChanged(x, y) {
        const index = (y * res) + x;
        return this.changedPixels[index];
    }

    reset() {
        this.changedPixels = Array(res * res).fill(false);
    }

}