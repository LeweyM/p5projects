/// <reference path="./p5.global-mode.d.ts" />

const res = 20;
let aStarGrid;
let drawingMode = true;
let goButton;
let resetButton;

function setup() {
	createCanvas(400, 400);	
	aStarGrid = new AStarGrid(res);
	goButton = createButton('Go');
	goButton.position(410, 0);
	goButton.mousePressed(() => {
		if (drawingMode) {
			drawingMode = false
		} 
	})
	resetButton = createButton('Reset');
	resetButton.position(410, 0);
	resetButton.mousePressed(() => {
		aStarGrid = new AStarGrid(res)
		drawingMode = true
	})
}

function draw() {
	background(220)

	if (drawingMode) {
		goButton.show()
		resetButton.hide()

		if (mouseIsPressed) {
			drawWall()
		}
	} else {
		goButton.hide()
		resetButton.show()
		
		if (!aStarGrid.hasFinished()) {
			aStarGrid.calculateNextCell()
		}
	}

	aStarGrid.draw()
}

function drawWall() {
	let scale = 400 / res
	let row = floor(mouseX / scale)
	let col = floor(mouseY / scale)
	aStarGrid.setWall(row, col)
}