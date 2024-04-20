const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ww = window.innerWidth;
let wh = window.innerHeight;

const c = canvas.getContext("2d");

const colors = ["#FFEBB2", "#E9A89B", "#D875C7", "#912BBC"]
const numOfCircles = 1000;
const maxBubbleRadius = 100;
const impactRadius = 50;
const radiusRangeStart = 1;
const radiusRangeEnd = 5;
const velocityRangeStart = -1
const velocityRangeEnd = 1

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", () => {
    ww = window.innerWidth;
    wh = window.innerHeight;
    canvas.width = ww;
    canvas.height = wh;
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

class TextButton {
	constructor(text, fontSize, fontStyle, positionX, positionY) {
		this.text = text;
        this.fontSize = fontSize;
        this.fontStyle = fontStyle;
        this.positionX = positionX;
        this.positionY = positionY;
        c.font = `${this.fontSize} ${this.fontStyle}`
		this.textWidth = c.measureText(text).width
        this.textHeight = c.measureText(text).actualBoundingBoxAscent + c.measureText(text).actualBoundingBoxDescent;
    }

    renderText() {
        c.font = `${this.fontSize} ${this.fontStyle}`
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillText(this.text, this.positionX, this.positionY)
    }

    renderTextButton() {
        c.font = `${this.fontSize} ${this.fontStyle}`
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(this.positionX, this.positionY - this.textHeight, this.textWidth, this.textHeight);
        c.fillText(this.text, this.positionX, this.positionY)
    }

    updateTextButton() {
        // Insert logic for animating text buttons
    }
}

let circles = [];
let textButtons = [];
let header;

function init() {
    // Initialize circles
    for (let i = 0; i < numOfCircles; i++) {
        const r = Math.floor(Math.random() * radiusRangeEnd + radiusRangeStart);
        const x = Math.floor(Math.random() * (window.innerWidth - r + 1));
        const y = Math.floor(Math.random() * (window.innerHeight - r + 1));
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = Math.random() * 2 - 1;
        const dy = Math.random() * 2 - 1;
        circles.push(new Circle(x, y, r, color, dx, dy));
    }

    // Intialize the header
    header = new TextButton("Exismys", "70px", "Monospace", 50, 100)

    // Initialize text buttons
    const navButtons = ["Intro", "Skills", "Contact", "Quotes"]
    const initialPositionX = 50;
    let initialPositionY = 200;
    for (let i = 0; i < navButtons.length; i++) {
        let text = navButtons[i]
        textButtons.push(new TextButton(text, "50px", "Monospace", initialPositionX, initialPositionY))
        initialPositionY += 100
    }
}

init()

function renderContentText() {
    c.fillRect(420, 50, 950, 680)
    c.font = "20px Monospace";
    c.fillStyle = "rgba(255, 255, 255, 0.8)"
    const sampleText = "Hello Exismys";
    const textHeight = c.measureText(sampleText).actualBoundingBoxAscent + c.measureText(sampleText).actualBoundingBoxDescent
    const content = "Hello there! Welcome to the crazy website - full canvas fun\nA new line of text let's see if it works"
    const textArray = content.split("\n");
    const initialOffsetX = 425;
    let initialOffsetY = 80;
	for (let i = 0; i < textArray.length; i++) {
    	    const text = textArray[i];
    	    c.fillText(text, initialOffsetX, initialOffsetY);
    	    initialOffsetY += textHeight + 20;
    	}
    
}

function animate() {
    requestAnimationFrame(animate);

    // Clear canvas
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // Render and update circles
    // for (let i = 0; i < numOfCircles; i++) {
    //     circles[i].draw();
    //     circles[i].update();
    // }

    // Render header text
    header.renderText()

    // Render text button 
    for (let i = 0; i < textButtons.length; i++) {
        textButtons[i].renderTextButton()
    }

    // Render content
    renderContentText()
}

animate();
