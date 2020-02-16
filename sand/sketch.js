/// <reference path="./p5.d/p5.global-mode.d.ts" />
let stepperMode = true;

const cellTypeMap = {
	"EMPTY": EmptyCell,
	"SAND": SandCell,
	"WALL": WallCell
}
const res = stepperMode ? 5 : 50
const scale = 400 / res

let pixels;

let removeMode = false
let activeCellType = "SAND"
let focusedX;
let focusedY;

let stepper;

function setup() {
	const cnv = createCanvas(400, 400)
	pixels = new Pixels(res)
	stepper = pixels.processStepper()

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

	const stepperModeButton = createButton("stepper mode")
	stepperModeButton.position(400, 420)
	stepperModeButton.mousePressed(() => { stepperMode = !stepperMode })

	const stepButton = createButton("step")
	stepButton.position(350, 420)
	stepButton.mousePressed(() => { step() })
}

function step() {
	let focusedPos = stepper.next()
	focusedX = focusedPos.value.x;
	focusedY = focusedPos.value.y;
}

function switchCell(cellClass) {
	const mouseOutsideOfCanvas = mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height;
	if (mouseOutsideOfCanvas) return;

	const row = floor(mouseY / scale)
	const col = floor(mouseX / scale)
	if (removeMode) {
		pixels.set(col, row, new EmptyCell(col, row))
	} else {
		pixels.set(col, row, new cellClass(col, row))
	}
}

function draw() {
	background(220)

	if (keyIsPressed) step()

	if (mouseIsPressed) switchCell(cellTypeMap[activeCellType])

	pixels.draw()

	if (!stepperMode) {
		pixels.process()
	} else {
		noFill()
		strokeWeight(4);
		stroke(51);
		rect(focusedX * scale, focusedY * scale, scale, scale)
	}

}
