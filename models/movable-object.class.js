class MovableObject {
    x = 120;
    y = 80;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;

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

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src...>
        this.img.src = path;
    }

    /**
     * loads all images from the given array in the variable imageCache, which is a JSON
     * 
     * @param {Array} arr ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image(); // Variable mit neuem Bild wird angelegt
            img.src = path; // Bild (Pfad) wird ins img Objekt reingeladen
            this.imageCache[path] = img; // this ist wichtig, weil wir auf Variable von Objekt zugreifen, nicht auf einer von innerhalb der Funktion
            // im imageCache werden Bilder reingeladen: Schlüssel ist der Datei-Pfad
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // draw() Methode kann den context ctx nutzen und kann auf diesen verschiedene Methoden aufrufen, um Welt zu malen
        // this.character.img ist das Bild
        // this braucht es, weil wir von dieser Welt auf context zugreifen wollen, alle Variablen aus dieser Klasse mit this öffnen
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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