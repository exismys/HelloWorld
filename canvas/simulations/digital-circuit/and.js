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


class And {
  constructor(x, y) {
    this.effectRadius = 10
    this.firstInputX = x
    this.secondInputY = y
  }

  draw() {
    // Rectangular part
    ctx.beginPath()
    ctx.moveTo(100, 50)
    ctx.lineTo(50, 50)
    ctx.lineTo(50, 100)
    ctx.lineTo(100, 100)
    ctx.stroke()

    // Circular part
    ctx.beginPath()
    ctx.arc(100, 75, 25, 3 * Math.PI / 2, Math.PI / 2, false)
    ctx.stroke()

    // Output line
    ctx.beginPath()
    ctx.moveTo(125, 75)
    ctx.lineTo(150, 75)
    ctx.stroke()

    // Input lines
    ctx.beginPath()
    ctx.moveTo(50, 62)
    ctx.lineTo(25, 62)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(50, 88)
    ctx.lineTo(25, 88)
    ctx.stroke()
  }
}

function init() {
  let andGate = new And(10, 10)
  andGate.draw()
}

init()