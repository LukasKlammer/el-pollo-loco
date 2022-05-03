class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250; // aus constructor rausnehmen, weil es ja immer fixe Werte sind

    constructor() {
        super().loadImage('../img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random() * 500; // Zahl zwischen 0 und 500
    }

}