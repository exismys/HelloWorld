function setup() {
    createCanvas(600, 400);
    background(0);
}
  
function draw() {
    strokeWeight(4);
    stroke(255);
    for (let x = 0; x <= width; x += 50) {
        for (let y = 0; y <= height; y += 50) {
            fill(random(255), 0, random(255));
            circle(x, y, 25);
        }
    }
}