/// <reference path="./p5.global-mode.d.ts" />

const res = 50;
let grid;

function setup() {
	createCanvas(400, 400);	
	grid = initiateGrid(res);
}

function initiateGrid(res) {
	const scale = 400/res
	const g = [];
	for (let i = 0; i < res; i++) {
		let row = []
		for (let j = 0; j < res; j++) {
			row.push(createVector(i*scale, j*scale))
		}
		g.push(row)
	}
	return g
}

function draw() {
	background(220)

	for (let col = 0; col < res; col++) {
		for (let row = 0; row < res; row++) {
			posVec = grid[col][row]
			fill(100, posVec.x, posVec.y)
			noStroke()
			rect(posVec.x, posVec.y, 400/res, 400/res)
		}
	}
}