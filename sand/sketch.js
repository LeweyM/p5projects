/// <reference path="./p5.d/p5.global-mode.d.ts" />

const EMPTY = 0;
const SAND = 1;
const WALL = 2;
const cellTypeMap = {
	"EMPTY": 0,
	"SAND": 1,
	"WALL": 2
}
const res = 50
const scale = 400 / res

let referencePixels;
let copyPixels = []

let removeMode = false
let activeCellType = "SAND"

function setup() {
	const cnv = createCanvas(400, 400)

	referencePixels = new ReferencePixels(res)

	cnv.mousePressed(() => {
		const row = floor(mouseY / scale)
		const col = floor(mouseX / scale)
		if (!referencePixels.isEmpty(col, row)) {
			removeMode = true
		}
	})
	cnv.mouseReleased(() => {
		removeMode = false
	})

	const sandButton = createButton("sand")
	sandButton.position(10, 10)
	sandButton.mousePressed(() => { activeCellType = "SAND" })


	const wallButton = createButton("wall")
	wallButton.position(50, 10)
	wallButton.mousePressed(() => { activeCellType = "WALL" })

	for (let i = 0; i < res; i++) {
		const copyRow = []
		for (let j = 0; j < res; j++) {
			copyRow.push(createVector(i * scale, j * scale, EMPTY))
		}
		copyPixels.push(copyRow)
	}

}

function processSand(x, y) {
	if (referencePixels.isSand(x, y) && notLastRow(y)) {
		if (isPixelEmpty(x, y + 1)) {
			moveCellDown(x, y, copyPixels)
		} else if (isPixelEmpty(x - 1, y + 1)) {
			moveCellDownLeft(x, y, copyPixels)
		} else if (isPixelEmpty(x + 1, y + 1)) {
			moveCellDownRight(x, y, copyPixels)
		}
	}
}

function moveCellDown(x, y, pixels) {
	pixels[x][y].z = EMPTY
	pixels[x][y + 1].z = SAND
}

function moveCellDownLeft(x, y, pixels) {
	pixels[x][y].z = EMPTY
	pixels[x - 1][y + 1].z = SAND
}

function moveCellDownRight(x, y, pixels) {
	pixels[x][y].z = EMPTY
	pixels[x + 1][y + 1].z = SAND
}

function isPixelEmpty(x, y) {
	return referencePixels.isEmpty(x, y)
}

function notLastRow(y) {
	return y < res - 1
}

function switchCell(newCellType) {
	const mouseOutsideOfCanvas = mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height;
	if (mouseOutsideOfCanvas) return;

	const row = floor(mouseY / scale)
	const col = floor(mouseX / scale)
	if (removeMode) {
		copyPixels[col][row].z = EMPTY
	} else {
		copyPixels[col][row].z = newCellType
	}
}

function copyGrid(pixels) {
	const nextPixels = [];
	for (row of pixels) {
		const nextRow = [];
		for (p of row) {
			nextRow.push(p);
		}
		nextPixels.push(nextRow);
	}
	return nextPixels;
}

function draw() {
	background(220)

	if (mouseIsPressed) {
		switchCell(cellTypeMap[activeCellType])
	}

	for (var i = res - 1; i >= 0; i--) {
		for (var j = res - 1; j >= 0; j--) {
			processSand(i, j)
		}
	}

	for (row of copyPixels) {
		for (p of row) {
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

	copyPixels = copyGrid(copyPixels)

	referencePixels.copyFrom(copyPixels)

}