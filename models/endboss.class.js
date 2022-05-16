class Endboss extends MovableObject {

    height = 400;
    width = 300;
    x = 2550;
    y = 55;
    world;
    speed = 0;

    death_sound = new Audio('../audio/endboss_death.mp3');

    IMAGES_WALKING = [
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
    ]

    IMAGES_DEAD = [
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
    ]

    IMAGES_HURT = [
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        '../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
    ]

    constructor() {
        super().loadImage('../img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animate();
    }

    animate() {
        // move animation
        setInterval(() => {
            if (1 == 1) {
                this.moveLeft();
            } 
        }, 1000 / 60);

        // walk, hurt, jump, dead animation
        setInterval(() => {

            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.speed > 0) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            
        }, 150);
    }
}