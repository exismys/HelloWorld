class Walker {
    constructor(x, y, r = 10) {
        this.pos = createVector(x, y);
        this.vel = createVector(1, -1);
        this.acc = createVector();
        this.r = r;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc.setMag(1);
        this.pos.add(this.vel.add(this.acc).limit(5));
    }

    show() {
        stroke(255);
        strokeWeight(2);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}