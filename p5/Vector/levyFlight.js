let pos, prev, color;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
    pos = createVector(width/2, height/2);
    prev = pos.copy();
    color = [255, 255, 255];
}


function draw() {
    stroke(color[0], color[1], color[2]);
    strokeWeight(2);
    line(pos.x, pos.y, prev.x, prev.y);
    prev.set(pos);
    let step = p5.Vector.random2D();
    let prob = random(100);
    if (prob < 2) {
        step.mult(random(25, 100));
        color = [random(255), random(255), random(255)];
    } else {
        step.setMag(2);
    }
    pos.add(step);
}