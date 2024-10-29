class Bubble {
    constructor(x, y, r, color = 0) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    move() {
        this.x += random(-2, 2);
        this.y += random(-2, 2);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(this.color, this.color, this.color, 100);
        circle(this.x, this.y, this.r * 2);
    }

    intersects(other) {
        return dist(this.x, this.y, other.x, other.y) < (this.r + other.r);
    }

    changeColor(color) {
        this.color = color;
    }

    contains(x, y) {
        return (this.x, this.y, x, y) < this.r;
    }
}

let bubbles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        bubbles[i] = new Bubble(random(width), random(height), random(10, 40));
    }
}
  
function draw() {
    background(0);
    
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].show();
        bubbles[i].move();
        let intersectsAny = false;
        for (let j = 0; j < bubbles.length; j++) {
            if (i != j && bubbles[i].intersects(bubbles[j])) {
                intersectsAny = true;
            }
        }
        if (intersectsAny) bubbles[i].changeColor(255);
        else bubbles[i].changeColor(0);
    }
}

function mousePressed() {
    let bubble = new Bubble(mouseX, mouseY, random(10, 40));
    bubbles.push(bubble);
}