class BackgroundObject extends MovableObject { // MovableObject nicht ganz perfekt, aber er bewegt sich ja auch, wenn man läuft

    height = 480;
    width = 720;
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}