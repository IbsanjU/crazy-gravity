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
	 * @param {Integer} dy velocity
	 * @param {Integer} radius radius
	 * @param {string} color color
	 */
	constructor(x, y, dy, radius, color) {
		this.x = x
		this.y = y
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
		if (this.y + this.radius > canvas.height) {
			this.dy = -this.dy * friction // bounce back and friction
		} else {
			this.dy += gravity // gravity or acceleration over time
		}
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
		const x = randomIntFromRange(0, canvas.width)
		const y = randomIntFromRange(0, canvas.height - radius / 2)
		var ball = new Ball(x, y, 2, radius, 'red')
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
