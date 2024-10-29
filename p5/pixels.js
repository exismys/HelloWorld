function setup() {
    createCanvas(255, 255);
    pixelDensity(1);
    // noLoop();
}
  
function draw() {
    background(0);
    strokeWeight(4);
    stroke(255);
    loadPixels();
    let xColor = 0, yColor = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (x + y * width) * 4;

            pixels[index] = xColor;
            pixels[index + 1] = random(255);
            pixels[index + 2] = yColor;
            pixels[index + 3] = 255;
            xColor++;

        }
        yColor++;
        xColor = 0;
    }
    updatePixels();
}