
let pixels = []
let nextPixels = []
const res = 50
const scale = 400 / res
let directionSwitcher = true;

function setup() {
	const cnv = createCanvas(400, 400)

	cnv.mousePressed(switchCell)

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

function processWaterCopy() {
	const nextPixels = []
	for (let i = 0; i < res; i++) {
		const row = []
		for (let j = 0; j < res; j++) {
			row.push(createVector(pixels[i][j].x, pixels[i][j].y, pixels[i][j].z))
		}
		nextPixels.push(row)
	}

	for (var x = res - 1; x >= 0; x--) {
		for (var y = res - 1; y >= 0; y--) {

			if (pixels[x][y].z == 1) {
				if (pixelEmpty(x, y + 1)) {
					moveCellDownCopy(x, y, nextPixels)
				} else if (pixelEmpty(x - 1, y + 1)) {
					moveCellDownLeft(x, y, pixels)
				} else if (pixelEmpty(x + 1, y + 1)) {
					moveCellDownRight(x, y, pixels)
				} else if (pixelEmpty(x + 1, y)) {
					moveCellLeft(x, y, pixels)
				} else if (pixelEmpty(x - 1, y)) {
					moveCellRight(x, y, pixels)
				} else {
					console.log("cell still")
				}
			}

		}
	}

	return nextPixels
}

function processWater(x, y) {
	if (pixels[x][y].z == 1) {
		if (pixelEmpty(x, y + 1)) {
			moveCellDown(x, y)
		} else {
			directionSwitcher ? spreadLeftFirst(x, y) : spreadRightFirst(x, y)
			directionSwitcher = !directionSwitcher
		}
	}
}

function spreadLeftFirst(x, y, pixels) {
	if (pixelEmpty(x - 1, y + 1)) {
		moveCellDownLeft(x, y, pixels)
	} else if (pixelEmpty(x + 1, y + 1)) {
		moveCellDownRight(x, y, pixels)
	} else if (pixelEmpty(x + 1, y)) {
		moveCellLeft(x, y, pixels)
	} else if (pixelEmpty(x - 1, y)) {
		moveCellRight(x, y, pixels)
	} else {
		console.log("cell lost")
	}
}

function spreadRightFirst(x, y) {
	if (pixelEmpty(x + 1, y + 1)) {
		moveCellDownRight(x, y)
	} else if (pixelEmpty(x - 1, y + 1)) {
		moveCellDownLeft(x, y)
	} else if (pixelEmpty(x - 1, y)) {
		moveCellRight(x, y)
	} else if (pixelEmpty(x + 1, y)) {
		moveCellLeft(x, y)
	}
}

function moveCellLeft(x, y, pixels) {
	pixels[x][y].z = 0
	pixels[x+1][y].z = 1
}

function moveCellRight(x, y, pixels) {
	pixels[x][y].z = 0
	pixels[x-1][y].z = 1
}

function moveCellDown(x, y) {
	pixels[x][y].z = 0
	pixels[x][y + 1].z = 1
}


function moveCellDownCopy(x, y, copy) {
	copy[x][y].z = 0
	copy[x][y + 1].z = 1
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

function switchCell() {
	const row = floor(mouseY / scale)
	const col = floor(mouseX / scale)
	if (pixels[col][row].z == 1) {
		pixels[col][row].z = 0
	} else {
		pixels[col][row].z = 1
	}
}

function draw() {
	background(220)

	if (mouseIsPressed) {
		switchCell()
	}

	for (var i = res - 1; i >= 0; i--) {
		for (var j = res - 1; j >= 0; j--) {
			processSand(i, j)
		}
	}

	// nextPixels = processWaterCopy()

	for (row of pixels) {
		for (p of row) {
 			fill(p.z * 255, 229, 170)
			noStroke()
			rect(p.x, p.y, 10, 10)
		}
	}

	// pixels = nextPixels;
}