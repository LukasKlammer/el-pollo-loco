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
        new BackgroundObject('../img/5.Fondo/Capas/1.suelo-fondo1/1.png'),
    ];

    canvas; // (HIER)
    ctx; // Variable context


    constructor(canvas) { // wird aus init() mitgegeben
        this.ctx = canvas.getContext('2d'); // in unser Objekt World wird canvas hineingegeben, später wollen wir dort Welt reinzeichnen
        // nicht direkt auf canvas malen möglich, sondern nur mit .getContext('2d')

        this.canvas = canvas; // dem canvas von oben (HIER) wird das übergebene canvas zugewiesen
        this.draw(); // draw Methode haben wir bereits unten
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas for redrawing

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);

        let self = this;
        requestAnimationFrame(function () { // ins requestAnimationFrame wird eine Funktion reingegeben, die wird ausgeführt, sobald alles drüber fertig gezeichnet wurde (asynchron)
            self.draw(); // Problem: this kennt er da drin nicht mehr: Variable namens self und this da zuweisen, dann geht es
            // draw() wird immer wieder aufgerufen
        }); // in Methode wird draw() so häufig aufgerufen, wie es die Grafikkarte hergibt: 10-60 mal pro Sekunde
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // draw() Methode kann den context ctx nutzen und kann auf diesen verschiedene Methoden aufrufen, um Welt zu malen
        // this.character.img ist das Bild
        // this braucht es, weil wir von dieser Welt auf context zugreifen wollen, alle Variablen aus dieser Klasse mit this öffnen
    }
}
