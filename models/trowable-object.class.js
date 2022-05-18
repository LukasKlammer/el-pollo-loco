class ThrowableObject extends MovableObject {
    height = 100;
    width = 100;
    
    throw_sound = new Audio('./audio/throw_bottle.mp3');
    bottle_break_sound = new Audio('./audio/bottle_break.mp3');

    IMAGES_BOTTLE_ROTATION = [
        './img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        './img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        './img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        './img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        './img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',
    ];

    constructor(x, y) {
        super().loadImage('./img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw();

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 100);
    }

    throw() {
        this.throw_sound.play();
        this.speedY = 13;
        this.applyGravity();
        setInterval(() => {
            this.x += 7;
        }, 25);
    }

    breakBottle() {
        this.energy = 0;
        this.bottle_break_sound.play();
    }
}