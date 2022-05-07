class Character extends MovableObject {

    height = 300;
    width = 120;
    y = 135;
    speed = 10;

    IMAGES_WALKING = [
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        '../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png',
    ];
    world;
    walking_sound = new Audio('../audio/running.mp3');


    constructor() {
        super().loadImage('../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        

        // walk animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 --> 0, Rest 6;    let i = 1 % 6 --> 0, Rest 1;     let i = 5 % 6 --> 0, Rest 5;     let i = 6 % 6 --> 1, Rest 0;     let i = 7 % 6 --> 1, Rest 1;
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2,  --> immer der Rest aus der Division
                let path = this.IMAGES_WALKING[i]; // Pfad ist aus dem array die [x] Position
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }




    jump() {

    }



}