function setup() {
  createCanvas(600, 600);
}

let x1 = 300;
let y1 = 300;

let x2 = 300;
let y2 = 300;

let x3 = 300;
let y3 = 300;

let x4 = 300;
let y4 = 300;

function chaos() {
  x1 = x1 + random(-5, 5);
  y1 = y1 + random(-5, 5);

  x2 = x2 + random(-5, 5);
  y2 = y2 + random(-5, 5);
  
  x3 = x3 + random(-5, 5);
  y3 = y3 + random(-5, 5);
  
  x4 = x4 + random(-5, 5);
  y4 = y4 + random(-5, 5);
}

function order() {
    if (x1 > 0 && y1 > 0) {
        x1 = x1 - 1;
        y1 = y1 - 1;
    } else {
        x1 = 300;
        y1 = 300;
    }

    if (x2 > 0 && y2 < 600) {
        x2 = x2 - 1;
        y2 = y2 + 1;
    } else {
        x2 = 300;
        y2 = 300;
    }

    if (x3 < 600 && y3 > 0) {
        x3 = x3 + 1;
        y3 = y3 - 1;
    } else {
        x3 = 300;
        y3 = 300;
    }

    if (x4 < 600 && y4 < 600) {
        x4 = x4 + 1;
        y4 = y4 + 1;
    } else {
        x4 = 300;
        y4 = 300;
    }
}

function draw() {
  background(50);
  stroke(200);
  strokeWeight(5);
  
  line(0, 0, x1, y1);
  line(0, 600, x2, y2);
  line(600, 0, x3, y3);
  line(600, 600, x4, y4);

    chaos();
    // order();
  
}