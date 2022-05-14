class Bottle extends MovableObject {
    height = 100;
    width = 100;
    imageDirection = 1 + parseInt(Math.random().toFixed(0));// returns 1 or 2 ; toFixed returns String, so we must parse to get an integer

    collected_sound = new Audio('../audio/collected.mp3');

    constructor() {
        super().loadImage(`../img/6.botella/2.Botella_enterrada${this.imageDirection}.png`);

        this.x = Math.random() * 2500; // Zahl zwischen 0 und 2500
        this.y = 330;

    }


}