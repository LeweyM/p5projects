const flock = [];
let perceptionRadius = 20;
let maxSpeed = 1;
let maxTurningForce = 0.5;

function setup() {
	createCanvas(400, 400);	
	for (let i = 0; i < 100; i++) {
		flock.push(new boid())
	}

	perceptionSlider = createSlider(1, 200, 20, 1)
	speedSlider = createSlider(0.1, 3, 1, 0.1)
	turningForceSlider = createSlider(0.1, 3, 0.5, 0.1)

}

class boid {
	position;
	velocity;

	constructor() {
		this.position = createVector(random(width), random(height))
		this.velocity = createVector(random(-1.5, 1.5), random(-1.5, 1.5))
	}

	update() {
		this.position.add(this.velocity)
	}

	getLocalBoids(flock) {
		const localBoids = []
		for (let boid of flock) {
			const distance = dist(boid.position.x, boid.position.y, this.position.x, this.position.y)
			if (boid != this && distance < perceptionRadius) {
				localBoids.push(boid);
			} 
		}
		return localBoids;
	}

	cohesion(flock) {
		const localBoids = this.getLocalBoids(flock);
		let averageLocation = createVector(0,0)
		for (let boid of localBoids) {
			averageLocation.add(boid.position)
		}
		averageLocation.div(localBoids.length || 1)

		const heading = p5.Vector.sub(averageLocation, this.position)

		if (localBoids.length > 0) {
			heading.sub(this.velocity)
		}

		heading.limit(maxTurningForce)

		this.velocity.add(heading).setMag(maxSpeed)
	}

	separate(flock) {
		const localBoids = this.getLocalBoids(flock);

		let heading = createVector(0,0)
		for (let boid of localBoids) {
			const distance = dist(boid.position.x, boid.position.y, this.position.x, this.position.y)
			const difference = p5.Vector.sub(this.position, boid.position)
			difference.div(distance)
			heading.add(difference)
		}
		heading.div(localBoids.length || 1)

		if (localBoids.length > 0) {
			heading.sub(this.velocity)
		}

		heading.limit(maxTurningForce)

		this.velocity.add(heading).setMag(maxSpeed)
	} 

	align(flock) {
		const localBoids = this.getLocalBoids(flock);

		//get average heading
		let heading = createVector(0,0)
		for (let boid of localBoids) {
			heading.add(boid.velocity)
		}
		heading.div(localBoids.length || 1)

		if (localBoids.length > 0) {
			heading.sub(this.velocity)
		}

		heading.limit(maxTurningForce)

		//steer towards heading
		this.velocity.add(heading).setMag(maxSpeed)
	} 

	edgeWrap() {
		if (this.position.x > width) {
			this.position.x = 0;
		}
		if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		}
		if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	draw() {
		fill(100)
		ellipse(this.position.x, this.position.y, 10, 10)
	}

}

function draw() {
	background(220)
	perceptionRadius = perceptionSlider.value()
	maxSpeed = speedSlider.value()
	maxTurningForce = turningForceSlider.value()


	for (let boid of flock) {
		boid.update()
		boid.cohesion(flock)
		boid.align(flock)
		boid.separate(flock)
		boid.edgeWrap()

		boid.draw()
	}

}