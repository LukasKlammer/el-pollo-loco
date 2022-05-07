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

        this.speed = 0.1 + Math.random() * 0.25;

        this.animate()

    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

}