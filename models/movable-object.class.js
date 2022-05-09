class MovableObject extends DrawableObject {
    // Variablen nur für bewegbare Objekte
    speed = 0.1;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    otherDirection = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 130;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6 --> 0, Rest 6;    let i = 1 % 6 --> 0, Rest 1;     let i = 5 % 6 --> 0, Rest 5;     let i = 6 % 6 --> 1, Rest 0;     let i = 7 % 6 --> 1, Rest 1;
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2,  --> immer der Rest aus der Division
        let path = images[i]; // Pfad ist aus dem array die [x] Position
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // character.isColliding(chicken); --> kollidiert character mit chicken
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Zeit in Zahlenform speichern
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in seconds
        return timePassed < 0.5; // time while return true
    }

    // wenn energy 0 ist returned die Funktion true
    isDead() {
        return this.energy == 0;
    }

}