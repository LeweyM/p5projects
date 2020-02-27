/// <reference path="./p5.global-mode.d.ts" />

let binaryHeap;
let nextNum;
let popBtn
let pushBtn
let popped = []

function setup() {
	nextNum = floor(random(1, 10))
	popBtn = createButton("pop")
	popBtn.mousePressed(() => {
		popped.push(binaryHeap.pop())
	})
	pushBtn = createButton("push")
	pushBtn.mousePressed(() => {
		binaryHeap.push(nextNum)
		nextNum = floor(random(1, 10))
	})

	binaryHeap = new BinaryHeap();
	binaryHeap.push(5)
	binaryHeap.push(2)
	binaryHeap.push(3)
	binaryHeap.push(6)
	binaryHeap.push(1)

	createCanvas(400, 400);	
}

function draw() {
	background(240)
	textSize(32);
	text(nextNum, 0, 32)

	recurDraw(0, 2, width/2, 50)
	
	textSize(16);
	text(popped, 0, 380)
}

function recurDraw(parentIndex, level, parentX, yOffset) {
	if (parentIndex > binaryHeap.heap.length) return;

	textSize(24);
	text(binaryHeap.heap[parentIndex], parentX, yOffset)

	level ++
	recurDraw((parentIndex * 2) + 1, level, parentX - 70 + (level * 10), yOffset + 40)
	recurDraw((parentIndex * 2) + 2, level, parentX + 70 - (level * 10), yOffset + 40)
}

