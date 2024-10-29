function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    // noLoop();
}

let offset = 0;
  
function draw() {
    background(0);
    strokeWeight(4);
    stroke(255);
    loadPixels();
    let yOff = offset;
    for (let y = 0; y < height; y++) {
        let xOff = offset;
        for (let x = 0; x < width; x++) {
            const index = (x + y * width) * 4;
            let noiseValue = noise(xOff, yOff) * 255;
            pixels[index] = noiseValue;
            pixels[index + 1] = noiseValue;
            pixels[index + 2] = noiseValue;
            pixels[index + 3] = 255;
            xOff += 0.01;

        }
        yOff += 0.01;
    }
    updatePixels();
    offset += 0.01;
}