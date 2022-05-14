class Coin extends MovableObject {
    height = 120;
    width = 120;

    collected_sound = new Audio('../audio/collected.mp3');

    constructor() {
        super().loadImage('../img/8.Coin/Moneda2.png');

        this.x = Math.random() * 2200; // Zahl zwischen 0 und 2500
        this.y = 30 + Math.random() * 340;
        
    }
}