let start = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // noLoop();
}

function draw() {
    background(51);
    stroke(255);
    noFill();

    // Graphing random points
    beginShape();
    for (let i = 0; i < width; i += 5) {
        vertex(i, random(height));
    }
    endShape();

    // Graphing perlin noise
    stroke(255, 180, 0);
    let xOff = start;
    beginShape();
    for (let x = 0; x < width; x++) {
        vertex(x, noise(xOff) * height);
        xOff += 0.01;
    }
    endShape();
    start += 0.01;
}