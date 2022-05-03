class BackgroundObject extends MovableObject { // MovableObject nicht ganz perfekt, aber er bewegt sich ja auch, wenn man läuft
    x = 0;
    y = 0;
    width = 720;
    height = 500;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}