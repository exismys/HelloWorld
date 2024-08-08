// Setup canvas
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
let displayWidth = 600
let displayHeight = 600
canvas.style.width = `${displayWidth}px`
canvas.style.height = `${displayHeight}px`
const dpr =  window.devicePixelRatio || 1
canvas.width = displayWidth * dpr
canvas.height = displayHeight * dpr
ctx.scale(dpr, dpr)

class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.velocity = 1
    this.acceleration = 1
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = "#000000"
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.fill()
  }

  update() {
    this.velocity += this.acceleration
    this.x += this.velocity
  }
}

let circle
function init() {
  circle = new Circle(50, 50, 10)
}

init()

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  circle.draw()
  circle.update()
  ctx.font = "32px Arial"
  ctx.fillText(dpr, 100, 100)
}

animate()
