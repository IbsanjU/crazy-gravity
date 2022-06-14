import utils, { randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const gravity = 1
const friction = 0.99

// Event Listeners
addEventListener('mousemove', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init()
})

// Objects
class Ball {
	/**
	 * Ball Object
	 * @param {Integer} x width
	 * @param {Integer} y height
	 * @param {Integer} dx x velocity
	 * @param {Integer} dy y velocity
	 * @param {Integer} radius radius
	 * @param {string} color color
	 */
	constructor(x, y, dx, dy, radius, color) {
		this.x = x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.radius = radius
		this.color = color
	}

	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.stroke()
		c.closePath()
	}

	update() {
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy * friction // bounce back and friction
		} else {
			this.dy += gravity // gravity or acceleration over time
		}
		if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx // bounce back on walls
		}

		this.x += this.dx // x velocity
		this.y += this.dy // velocity
		this.draw()
	}
}

// Implementation
let ballArray = []
function init() {
	ballArray = []
	for (let i = 0; i < 50; i++) {
		const radius = randomIntFromRange(5, 30)
		const x = randomIntFromRange(radius, canvas.width - radius)
		const y = randomIntFromRange(0, canvas.height - radius)
		const dx = randomIntFromRange(-2, 2)
		const dy = randomIntFromRange(-2, 2)
		var ball = new Ball(x, y, dx, dy, radius, 'red')
		ballArray.push(ball)
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
	ballArray.forEach((object) => {
		object.update()
	})
}

init()
animate()
