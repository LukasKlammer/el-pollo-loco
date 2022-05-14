class Coin extends MovableObject {
    height = 100;
    width = 100;

    collected_sound = new Audio('../audio/collected.mp3');

    constructor() {
        super().loadImage('../img/8.Coin/Moneda1.png');

        this.x = Math.random() * 2500; // Zahl zwischen 0 und 2500
        this.y = 330;
        
    }
}