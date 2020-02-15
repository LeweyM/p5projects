/// <reference path="./p5.d/p5.global-mode.d.ts" />

const EMPTY = 0;
const SAND = 1;
const WALL = 2;
const cellTypeMap = {
	"EMPTY" : 0,
	"SAND" : 1,
	"WALL" : 2
}
const res = 50
const scale = 400 / res

const pixels = []
let removeMode = false
let activeCellType = "SAND"


function setup() {
	const cnv = createCanvas(400, 400)

	cnv.mousePressed(() => {
		const row = floor(mouseY / scale)
		const col = floor(mouseX / scale)
		if (pixels[col][row].z != EMPTY) {
			removeMode = true
		}
	}) 
	cnv.mouseReleased(() => {
		console.log("released")
		removeMode = false
	})

	const sandButton = createButton("sand")
	sandButton.position(10, 10)
	sandButton.mousePressed(() => {activeCellType = "SAND"})


	const wallButton = createButton("wall")
	wallButton.position(50, 10)
	wallButton.mousePressed(() => {activeCellType = "WALL"})

	for (let i = 0; i < res; i++) {
		const row = []
		for (let j = 0; j < res; j++) {
			row.push(createVector(i * scale, j * scale, 0))
		}
		pixels.push(row)
	}

}

function processSand(x, y) {
	if (pixels[x][y].z == 1 && notLastRow(y)) {
		if (pixelEmpty(x, y + 1)) {
			moveCellDown(x, y)
		} else {
			if (pixelEmpty(x - 1, y + 1)) {
				moveCellDownLeft(x, y, pixels)
			} else if (pixelEmpty(x + 1, y + 1)) {
				moveCellDownRight(x, y, pixels)
			}
		}
	}
}

function moveCellDown(x, y) {
	pixels[x][y].z = 0
	pixels[x][y + 1].z = 1
}

function moveCellDownLeft(x, y, pixels) {
	pixels[x][y].z = 0
	pixels[x - 1][y + 1].z = 1	
}

function moveCellDownRight(x, y, pixels) {
	pixels[x][y].z = 0
	pixels[x + 1][y + 1].z = 1	
}

function pixelEmpty(x, y) {
	return x >= 0 
		&& y >= 0
		&& x < res
		&& y < res	
		&& pixels[x][y].z == 0
}

function notLastRow(y) {
	return y < pixels.length - 1 
}

function switchCell(newCellType) {
	const row = floor(mouseY / scale)
	const col = floor(mouseX / scale)
	if (removeMode) {
		pixels[col][row].z = EMPTY
	} else {
		pixels[col][row].z = newCellType
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

	for (row of pixels) {
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
}