let timer = ms => new Promise(res => setTimeout(res, ms));

async function drawCircle() {
    let canvas = document.getElementById("circleCanvas");
    let context = canvas.getContext("2d");
    const radius = 50;
    const centerX = 199;
    const centerY = 199;

    context.fillStyle = 'rgb(0, 0, 0)';
    for (let i = 0; i < 360; i++) {
        context.fillRect(centerX + 50 * Math.cos((2 * Math.PI / 360) * i), centerY + 50 * Math.sin((2 * 
            Math.PI / 360) *i), 1, 1);
        await timer(10);
    }
}