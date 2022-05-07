class Chicken extends MovableObject {

    height = 70;
    width = 60;
    y = 360;

    IMAGES_WALKING = [
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ]

    constructor() {
        super().loadImage('../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.loadImages(this.IMAGES_WALKING);

        this.animate()

    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 --> 0, Rest 6;    let i = 1 % 6 --> 0, Rest 1;     let i = 5 % 6 --> 0, Rest 5;     let i = 6 % 6 --> 1, Rest 0;     let i = 7 % 6 --> 1, Rest 1;
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2,  --> immer der Rest aus der Division
            let path = this.IMAGES_WALKING[i]; // Pfad ist aus dem array die [x] Position
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }

}