class Chicken extends MovableObject {

    height = 70;
    width = 60;
    y = 360;
    
    death_sound = new Audio('../audio/chicken_death.mp3');

    IMAGES_WALKING = [
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ]

    IMAGES_DEAD = [
        '../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png'
    ]

    constructor() {
        super().loadImage('../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png');
        this.x = 200 + Math.random() * 2800; // Zahl zwischen 200 und 700
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.speed = 0.3 + Math.random() * 0.25;

        this.animate()
    }

    animate() {
        // move animation
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 2. Parameter Millisekunden, also alle wieviel Zeit wiederholt wird

        // walk and dead animation
        setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.speed > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage('../img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png');
            }
        }, 150);
    }



}