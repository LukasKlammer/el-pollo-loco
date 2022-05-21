class DrawableObject {
    x = 120;
    y = 80;
    img;
    height = 150;
    width = 120;
    imageCache = {};
    currentImage = 0;
    showImage = true;
    

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

        //this.drawFrame(ctx); // drawFrame will be needed only to debug or to learn how collisions work
    }
    

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            this.drawRectangle(ctx);
            ctx.stroke();
        }
    }


    /**
     * draws the rectangle-border of image: some images are bigger than the content in it, so there is a need to correct the measures
     * 
     * @param {*} ctx rendercontext
     */
    drawRectangle(ctx) {
        if (this instanceof Character) {
            ctx.rect(this.x, this.y + 100, this.width, this.height - 100);
        } else if (this instanceof Coin) {
            ctx.rect(this.x + 40, this.y + 40, this.width - 80, this.height - 80);
        } else {
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

}