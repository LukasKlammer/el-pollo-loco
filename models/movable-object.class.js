class MovableObject extends DrawableObject {
    // Variablen nur für bewegbare Objekte
    speed = 0.03;
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
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 15;
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
        if (this instanceof Character && mo instanceof Coin) { // character should collect coins only when the coin is reached
            return this.x + this.width > mo.x + 40 &&
            this.y + this.height > mo.y + 40 &&
            this.x < mo.x + 40 &&
            this.y + 100 < mo.y + mo.height - 40;
        } else {
            return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
        }
    }
    

    isTrampling(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height &&
        this.y < 131;
    }


    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Zeit in Zahlenform speichern
        }
    }


    /**
     * calculates the passed time from an event and gives it in seconds
     * 
     * @param {integer} lastActionEventTime requires the number of ms since 1.1.1970 (Unix time stamp)
     * @returns time passed in seconds
     */
    timerOfAction(lastActionEventTime) {
        let timePassed = new Date().getTime() - lastActionEventTime; // difference in ms
        timePassed = timePassed / 1000; // difference in seconds
        return timePassed; // time while return true
    }


    isHurt() {
        let timePassed = this.timerOfAction(this.lastHit);
        return timePassed < 1;
    }

    // wenn energy 0 ist returned die Funktion true
    isDead() {
        return this.energy == 0;
    }

    
    kill() {
        this.energy = 0;
        this.speed = 0;
    }

}