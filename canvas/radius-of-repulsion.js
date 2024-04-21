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

function getTextHeight(text) {
    return c.measureText(text).actualBoundingBoxAscent + c.measureText(text).actualBoundingBoxDescent;
}

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
        this.textHeight = getTextHeight(text);
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

function renderContent(rectangle, text) {
    const marginX = 5
    const marginY = 20
    const wordSpacing = 10
    const lineSpacing = 20
    c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    c.font = "20px Monospace";
    c.fillStyle = "rgba(255, 255, 255, 0.8)"
    const textHeight = getTextHeight(text)
    const initialOffsetX = rectangle.x + marginX
    const initialOffsetY = rectangle.y + textHeight + marginY
    let offsetX = initialOffsetX
    let offsetY = initialOffsetY
    let lines = text.split("\n")
    for (let line of lines) {
        let words = line.split(" ")
        for (let word of words) {
            const textWidth = c.measureText(word).width
            if (offsetX + textWidth > rectangle.x + rectangle.width - marginX) {
                offsetX = initialOffsetX
                offsetY += textHeight + lineSpacing
            }
            c.fillText(word, offsetX, offsetY)
            offsetX += textWidth + wordSpacing
        }
        offsetX = initialOffsetX
        offsetY += textHeight + lineSpacing
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

    // Initialize content
}

init()

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

    // Render content text
    let contentArea = {
        x: 420,
        y: 50,
        width: 950,
        height: 680
    }
    const contentText = "You are something the whole universe is doing in the same way that a wave is something that the whole ocean is doing.\nThe real, deep down you is the whole universe.\nTry and imagine what it will be like to go to sleep and never wake up.\nWhat was it like to wake up after having never gone to sleep? That was when you were born.\nNo amount of anxiety makes any difference to anything that is going to happen.\nFaith is, above all, openness; an act of trust in the unknown."
    renderContent(contentArea, contentText)
}

animate();
