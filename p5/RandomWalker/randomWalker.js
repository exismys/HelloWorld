function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);
}

let x = 400, y = 400;
  
function draw() {
    stroke(255);
    strokeWeight(2);
    point(x, y);
    let direction = floor(random(4));
    switch (direction) {
        case 0:
            x = x + 1;
            break;
        case 1:
            y = y + 1;
            break;
        case 2:
            x = x - 1;
            break;
        case 3:
            y = y - 1;
            break;
    }
}