class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250; // aus constructor rausnehmen, weil es ja immer fixe Werte sind

    constructor() {
        super().loadImage('../img/5.Fondo/Capas/4.nubes/1.png');

        this.x = Math.random() * 500; // Zahl zwischen 0 und 500

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.1; // was soll ausgeführt werden
        }, 1000 / 60); // 2. Parameter Millisekunden, also alle wieviel Zeit wiederholt wird

    }


}