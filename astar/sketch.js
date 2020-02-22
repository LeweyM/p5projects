/// <reference path="./p5.global-mode.d.ts" />

const res = 50;
let AStar;

function setup() {
	createCanvas(400, 400);	
	
	AStar = new AStarGrid(res);
}

function draw() {
	background(220)
	
	if (!AStar.hasFinished()) {
		AStar.calculateNextCell()
	} else {
		AStar = new AStarGrid(res)
	}

	AStar.draw()
}