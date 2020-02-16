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
let writerPixels;

let removeMode = false
let activeCellType = "SAND"

function setup() {
	const cnv = createCanvas(400, 400)

	referencePixels = new ReferencePixels(res)
	writerPixels = new WriterPixels(res)

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
}

function processSand(x, y) {
	if (referencePixels.isSand(x, y) && notLastRow(y)) {
		if (isPixelEmpty(x, y + 1)) {
			moveCellDown(x, y)
		} else if (isPixelEmpty(x - 1, y + 1)) {
			moveCellDownLeft(x, y)
		} else if (isPixelEmpty(x + 1, y + 1)) {
			moveCellDownRight(x, y)
		}
	}
}

function moveCellDown(x, y) {
	writerPixels.setEmpty(x, y)
	writerPixels.setSand(x, y + 1)
}

function moveCellDownLeft(x, y) {
	writerPixels.setEmpty(x, y)
	writerPixels.setSand(x - 1, y + 1)
}

function moveCellDownRight(x, y) {
	writerPixels.setEmpty(x, y)
	writerPixels.setSand(x + 1, y + 1)
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
		writerPixels.setEmpty(col, row)
	} else {
		writerPixels.set(col, row, newCellType)
	}
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

	writerPixels.draw()

	writerPixels.copyFrom(referencePixels.pixels)
	referencePixels.copyFrom(writerPixels.pixels)

}