/// <reference path="./p5.global-mode.d.ts" />

const res = 50;
let aStarGrid;
let drawingMode = true;
let goButton;
let resetButton;

function setup() {
	createCanvas(400, 400);	
	aStarGrid = new AStarGrid(res);
	randomWalls()
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
		randomWalls()
		drawingMode = true
	})
}

function randomWalls() {
	function drawWall(x,y,x2,y2) {
		let currentX = min(x, x2)
		let currentY = min(y, y2)
		
		let endX = max(x, x2)
		let endY = max(y, y2)

		while (currentX < endX) {
			aStarGrid.setWall(currentX, currentY)
			currentX++
		}
		
		while (currentY < endY) {
			aStarGrid.setWall(currentX, currentY)
			currentY++
		}
	}

	let wallCount = floor(random(10, 20))
	for (let i = 0; i < wallCount; i++) {
		const x = floor(random(0, res));
		const y = floor(random(0, res));
		const len = floor(random(0, res - max(x, y)));
		const vertical = random(-1, 1) > 0

		if (vertical) {
			let y2 = y > (res / 2)
			? y - len 
			: y + len
			drawWall(x, y, x, y2)
		} else {
			let x2 = x > (res / 2)
				? x - len 
				: x + len
			drawWall(x, y, x2, y)
		}
	}
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
	if (!mouseWithinCanvas()) return;
	let scale = 400 / res
	let row = floor(mouseX / scale)
	let col = floor(mouseY / scale)
	aStarGrid.setWall(row, col)
}

const mouseWithinCanvas = () => mouseX > 0 && mouseX <= 400 && mouseY > 0 && mouseY <= 400