const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const colors = ["#FFEBB2", "#E9A89B", "#D875C7", "#912BBC"]
const numOfCircles = 1000;
const maxBubbleRadius = 100;
const impactRadius = 50;
const radiusRangeStart = 1;
const radiusRangeEnd = 5;

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

class Circle {
    constructor(x, y, radius, color, dx, dy) {
        this.x = x
        this.y = y
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
            this.dx = - this.dx;
        }
        if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
            this.dy = - this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(this.x - mouse.x) < impactRadius && Math.abs(this.y - mouse.y) < impactRadius && this.radius < maxBubbleRadius) {
            this.radius += 1;
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }
}

let circles = []

function init() {
    for (let i = 0; i < numOfCircles; i++) {
        const r = Math.floor(Math.random() * radiusRangeEnd + radiusRangeStart)
        const x = Math.floor(Math.random() * (window.innerWidth - r + 1))
        const y = Math.floor(Math.random() * (window.innerHeight - r + 1))
        const color = colors[Math.floor(Math.random() * 4)]
        const dx = Math.floor(Math.random() * 3) - 1
        const dy = Math.floor(Math.random() * 3) - 1
        circles.push(new Circle(x, y, r, color, dx, dy))
    }
}

init()

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let i = 0; i < numOfCircles; i++) {
        circles[i].draw()
        circles[i].update()
    }
}

animate();