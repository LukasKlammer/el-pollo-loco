const level1 = new Level(
    [
        new Endboss(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cloud(),
    ],
    [
        new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719), // Himmel
        new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', -719), // pinker Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', -719),  // roter Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719), // mehrfarbiger Hintergrund rechter Teil

        new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0), // Himmel
        new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/1.png', 0), // pinker Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/1.png', 0),  // roter Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0), // mehrfarbiger Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719), // Himmel
        new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', 719), // pinker Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', 719),  // roter Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719), // mehrfarbiger Hintergrund rechter Teil

        new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 1438), // Himmel
        new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/1.png', 1438), // pinker Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/1.png', 1438),  // roter Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 1438), // mehrfarbiger Hintergrund linker Teil
        new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 + 1438), // Himmel
        new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', 719 + 1438), // pinker Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', 719 + 1438),  // roter Hintergrund rechter Teil
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 + 1438), // mehrfarbiger Hintergrund rechter Teil
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],

);


    // Idee, wie man BackgroundObjects mit for-Schleife generieren könnte
    // createBackgroundObjects() {
    //     for (let i = -10; i <= 10; i++) {
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0 + 1437 * i)); // Himmel
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/1.png', 0 + 1437 * i)); // pinker Hintergrund linker Teil
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/1.png', 0 + 1437 * i));  // roter Hintergrund linker Teil
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0 + 1437 * i)); // mehrfarbiger Hintergrund linker Teil
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719  + 1437 * i)); // Himmel
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', 719 + 1437 * i)); // pinker Hintergrund rechter Teil
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', 719 + 1437 * i));  // roter Hintergrund rechter Teil
    //         this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719  + 1437 * i)); // mehrfarbiger Hintergrund rechter Teil
    //     }
    // }