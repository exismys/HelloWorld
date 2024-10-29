function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
}
  
function draw() {
    stroke(255, 50);
    strokeWeight(2);
    translate(width / 2, height / 2);
    let u = p5.Vector.random2D();
    u.mult(random(100));
    line(0, 0, u.x, u.y);
}