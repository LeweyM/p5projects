/// <reference path="./p5.global-mode.d.ts" />

const res = 25;
let aStarGrid;

const auto = "AUTO"
const drawing = "DRAWING"
const stepping = "STEPPING"
const animated = "ANIMATED"
const modes = [auto, stepping, animated]
let displayMode = auto

const buttonFactory = (title, fn) => {
	let btn = createButton(title);
	btn.mousePressed(() => {
		loop()
		fn()
	})
	return btn 
}

let goButton;
let resetButton;
let stepButton;

function setup() {

	createCanvas(400, 400);	
	aStarGrid = new AStarGrid(res);
	randomWalls()

	goButton = buttonFactory('Go', () => displayMode = animated)
	pauseButton = buttonFactory('Pause', () => displayMode = stepping)	
	stepButton = buttonFactory('Step', () => {})
	resetButton = buttonFactory('Reset', () => {
		aStarGrid = new AStarGrid(res)
		randomWalls()
		displayMode = drawing
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
	hideButtons();
	if (displayMode === auto) {
		drawAutoRoute();
	} else {
		drawAnimatedRoute();
	}
}

function hideButtons() {
	resetButton.hide();
	stepButton.hide();
	goButton.hide();
	pauseButton.hide();
}

function drawAutoRoute() {
	pauseButton.show()
	if (mouseIsPressed && mouseWithinCanvas()) {
		aStarGrid.setFinish(floor(mouseX / (400 / res)), floor(mouseY / (400 / res)));
		console.log("Time taken: ", deltaTime.toFixed(2), " ms");
	}
	aStarGrid.fastestRoute();
	aStarGrid.draw();
	loop();
}

function drawAnimatedRoute() {
	if (displayMode === drawing) {
		goButton.show();

		if (mouseIsPressed && mouseWithinCanvas()) drawWallAtMouse()
		
		aStarGrid.draw();
		loop();
	}
	
	if (displayMode === stepping) {
		stepButton.show()
		resetButton.show()
		goButton.show()
		if (!aStarGrid.hasFinished()) {
			aStarGrid.calculateNextCell();
		}
	
		aStarGrid.draw();
		noLoop();
	} 

	if (displayMode === animated) {
		resetButton.show()
		pauseButton.show()

		if (!aStarGrid.hasFinished()) {
			aStarGrid.calculateNextCell();
		}
	
		aStarGrid.draw();
		loop();
	} 
}

function drawWallAtMouse() {
	if (!mouseWithinCanvas()) return;
	let scale = 400 / res
	let row = floor(mouseX / scale)
	let col = floor(mouseY / scale)
	aStarGrid.setWall(row, col)
}

const mouseWithinCanvas = () => mouseX > 0 && mouseX <= 400 && mouseY > 0 && mouseY <= 400