let timer = ms => new Promise(res => setTimeout(res, ms));


async function draw() {
    let canvas = document.getElementById("mycanvas");
    let context = canvas.getContext("2d");

    context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect(10, 10, 50, 50);
    let iter = 10;
    while (iter--) {
        for (let i = 0; i < 100; i++) {
            context.fillStyle = 'rgba(0, 0, 200, 0.1)';
            context.fillRect(30, 30, 50 + i, 50 + i);
            await timer(10);
        }

        for (let i = 99; i >= 0; i--) {
            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillRect(30, 30, 50 + i, 50 + i)
            context.fillStyle = 'rgba(0, 0, 200, 0.5)';
            context.fillRect(30, 30, 50 + i-1, 50 + i-1)
            await timer(10);
        }
    }
    
}