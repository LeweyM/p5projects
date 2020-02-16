/// <reference path="./p5.d/p5.global-mode.d.ts" />

class CopyPixels {
    pixels = [];
    res;
    
    CopyPixels(res) {
        res = res;

        for (let i = 0; i < res; i++) {
            const row = []
            for (let j = 0; j < res; j++) {
                row.push(createVector(i * scale, j * scale, EMPTY))
            }
            pixels.push(row)
        }
    }

    setPixel(x, y, newValue) {
        if (x < 0 || x >= res || y < 0 || y >= res) return false
        pixel[x][y].z = newValue
    } 

} 