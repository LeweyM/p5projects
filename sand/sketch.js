/// <reference path="./p5.d/p5.global-mode.d.ts" />
let stepperMode = false;

const EMPTY = 0;
const SAND = 1;
const WALL = 2;

const cellTypeMap = {
	"EMPTY": 0,
	"SAND": 1,
	"WALL": 2
}
const res = stepperMode ? 5 : 50
const scale = 400 / res

let pixels;

let removeMode = false
let activeCellType = "SAND"
let focusedX;
let focusedY;

let stepper;
const processStepper = function* () {
	while (true) {
		for (let i = 0; i < res; i++) {
			for (let j = 0; j < res; j++) {
				pixels.processSand(i, j)
				focusedX = i
				focusedY = j
				yield
			}
		}
		pixels.changedPixels.reset()
	}
};

function setup() {
	const cnv = createCanvas(400, 400)
	stepper = processStepper()
	pixels = new Pixels(res)

	cnv.mousePressed(() => {
		const row = floor(mouseY / scale)
		const col = floor(mouseX / scale)
		if (!pixels.isEmpty(col, row)) {
			removeMode = true
		}
	})
	cnv.mouseReleased(() => {
		removeMode = false
	})

	const sandButton = createButton("sand")
	sandButton.position(10, 420)
	sandButton.mousePressed(() => { activeCellType = "SAND" })

	const wallButton = createButton("wall")
	wallButton.position(50, 420)
	wallButton.mousePressed(() => { activeCellType = "WALL" })


	const stepButton = createButton("step")
	stepButton.position(350, 420)
	stepButton.mousePressed(() => { stepper.next() })
}

function switchCell(newCellType) {
	const mouseOutsideOfCanvas = mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height;
	if (mouseOutsideOfCanvas) return;

	const row = floor(mouseY / scale)
	const col = floor(mouseX / scale)
	if (removeMode) {
		pixels.set(col, row, new EmptyCell(col, row))
	} else {
		if (newCellType == SAND) {
			pixels.set(col, row, new SandCell(col, row))
		} else {
			pixels.set(col, row, new WallCell(col, row))
		}
	}
}

function draw() {
	background(220)

	if (keyIsPressed) {
		stepper.next()
	}

	if (mouseIsPressed) {
		switchCell(cellTypeMap[activeCellType])
	}

	if (!stepperMode) {
		pixels.process()
	}

	pixels.draw()

	if (stepperMode) {
		noFill()
		strokeWeight(4);
		stroke(51);
		rect(focusedX * scale, focusedY * scale, scale, scale)
	}
}
