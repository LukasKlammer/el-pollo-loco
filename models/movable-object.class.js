class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 120;
    imageCache = {};

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
            this.imageCache[path] = path; // this ist wichtig, weil wir auf Variable von Objekt zugreifen, nicht auf einer von innerhalb der Funktion
            // im imageCache werden Bilder reingeladen: Schlüssel ist der Datei-Pfad
        });
    }


    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {

    }
}