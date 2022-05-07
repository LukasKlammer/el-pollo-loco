class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [

        // new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0), // Himmel
        // new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/1.png', 0), // pinker Hintergrund linker Teil
        // new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/1.png', 0),  // roter Hintergrund linker Teil
        // new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0), // mehrfarbiger Hintergrund linker Teil
        // new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719), // Himmel
        // new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', 719), // pinker Hintergrund rechter Teil
        // new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', 719),  // roter Hintergrund rechter Teil
        // new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719), // mehrfarbiger Hintergrund rechter Teil
    ];

    canvas; // (--> siehe unten im constructor)
    ctx; // Variable context
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) { // wird aus init() mitgegeben
        this.createBackgroundObjects();

        this.ctx = canvas.getContext('2d'); // in unser Objekt World wird canvas hineingegeben, später wollen wir dort Welt reinzeichnen
        // nicht direkt auf canvas malen möglich, sondern nur mit .getContext('2d')

        this.canvas = canvas; // dem canvas von oben (HIER) wird das übergebene canvas zugewiesen
        this.keyboard = keyboard;

        this.draw(); // draw Methode haben wir bereits unten
        this.setWorld();
    }


    createBackgroundObjects() {
        for (let i = 0; i <= 1; i++) {
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0 + 1437 * i)); // Himmel
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/1.png', 0 + 1437 * i)); // pinker Hintergrund linker Teil
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/1.png', 0 + 1437 * i));  // roter Hintergrund linker Teil
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0 + 1437 * i)); // mehrfarbiger Hintergrund linker Teil
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0 + 719)); // Himmel
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/3.Fondo3/2.png', 719)); // pinker Hintergrund rechter Teil
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/2.Fondo2/2.png', 719 ));  // roter Hintergrund rechter Teil
            this.backgroundObjects.push(new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719)); // mehrfarbiger Hintergrund rechter Teil
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas for redrawing

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () { // ins requestAnimationFrame wird eine Funktion reingegeben, die wird ausgeführt, sobald alles drüber fertig gezeichnet wurde (asynchron)
            self.draw(); // Problem: this kennt er da drin nicht mehr: Variable namens self und this da zuweisen, dann geht es
            // draw() wird immer wieder aufgerufen
        }); // in Methode wird draw() so häufig aufgerufen, wie es die Grafikkarte hergibt: 10-60 mal pro Sekunde
    }

    setWorld() {
        this.character.world = this; // character bekommt Variable world --> da ist alles aus world drin
    }


    /**
     * adds objects to map, for example all chickens
     * 
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * adds an object to the map
     * 
     * @param {object} mo stands for movableobject
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // draw() Methode kann den context ctx nutzen und kann auf diesen verschiedene Methoden aufrufen, um Welt zu malen
        // this.character.img ist das Bild
        // this braucht es, weil wir von dieser Welt auf context zugreifen wollen, alle Variablen aus dieser Klasse mit this öffnen

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save(); // aktuelle Einstellungen ctx speichern
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
