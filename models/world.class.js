class World {

    character = new Character();
    level = level1;
    canvas; // (--> siehe unten im constructor)
    ctx; // Variable context
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) { // wird aus init() mitgegeben
        this.ctx = canvas.getContext('2d'); // in unser Objekt World wird canvas hineingegeben, später wollen wir dort Welt reinzeichnen
        // nicht direkt auf canvas malen möglich, sondern nur mit .getContext('2d')

        this.canvas = canvas; // dem canvas von oben (HIER) wird das übergebene canvas zugewiesen
        this.keyboard = keyboard;
        this.draw(); // draw Methode haben wir bereits unten
        this.setWorld();
        this.checkCollisions();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas for redrawing

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

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

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    
                }
            });
        }, 200);
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

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);


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
