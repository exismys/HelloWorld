let xOff1 = 100;
let xOff2 = 1000;
function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(51);
    // Random
    circle(random(width), 250, 25);

    // Noise
    circle(map(noise(xOff1), 0, 1, 0, width), 200, 25);

    // Noise 2D
    circle(map(noise(xOff1), 0, 1, 0, width), map(noise(xOff2), 0, 1, 0, width), 25)
    xOff1 += 0.01;
    xOff2 += 0.01;
}