function setup() {
  createCanvas(400, 300);
  background(0);
}

function draw() {
  noStroke();
  fill(random(255), 0, random(255), 200);
  circle(mouseX, mouseY, 20)
}