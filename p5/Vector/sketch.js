let walker;

function setup() {
    createCanvas(windowWidth, windowHeight);
    walker = new Walker(width/2, height/2);
}


function draw() {
    background(51);
    walker.show();
    walker.update();
}