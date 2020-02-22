/// <reference path="./p5.global-mode.d.ts" />

const res = 10;
let grid;

function setup() {
	createCanvas(400, 400);	
	
	grid = new Grid(res);
	grid.setStart(3,3)
	grid.setFinish(8,8)
}

function draw() {
	background(220)

	grid.draw()
}