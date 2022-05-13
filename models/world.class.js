class World {

    character = new Character();
    level = level1;
    canvas; // (--> siehe unten im constructor)
    ctx; // Variable context
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    availableThrowObjects = 0;
    throwableObjects = [];
    background_sound = new Audio('../audio/background_music.mp3');

    constructor(canvas, keyboard) { // wird aus init() mitgegeben
        this.ctx = canvas.getContext('2d'); // in unser Objekt World wird canvas hineingegeben, später wollen wir dort Welt reinzeichnen
        // nicht direkt auf canvas malen möglich, sondern nur mit .getContext('2d')

        this.canvas = canvas; // dem canvas von oben (HIER) wird das übergebene canvas zugewiesen
        this.keyboard = keyboard;
        this.draw(); // draw Methode haben wir bereits unten
        this.setWorld();
        this.run(); // war vorher checkCollision() --> jetzt allgemeiner run() --> nicht zu viele Intervalle laufen lassen
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas for redrawing

        // ----- space for moved objects ----- //
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        // ----- space for fixed objects ----- //
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);

        let self = this;
        requestAnimationFrame(function () { // ins requestAnimationFrame wird eine Funktion reingegeben, die wird ausgeführt, sobald alles drüber fertig gezeichnet wurde (asynchron)
            self.draw(); // Problem: this kennt er da drin nicht mehr: Variable namens self und this da zuweisen, dann geht es
            // draw() wird immer wieder aufgerufen
        }); // in Methode wird draw() so häufig aufgerufen, wie es die Grafikkarte hergibt: 10-60 mal pro Sekunde
    }

    setWorld() {
        this.character.world = this; // character bekommt Variable world --> da ist alles aus world drin
        this.throwableObjects.world = this;
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

    run() {
        this.background_sound.volume = 0.2;
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.background_sound.play();
        }, 200);
    }

    checkCollisions() {
        this.collisionEnemyCharacter();
        this.collisionThrowableObjectEnemy();
        this.collisionCharacterBottle();
    }

    collisionEnemyCharacter() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isTrampled(enemy)) {
                enemy.kill();
                enemy.death_sound.play();
                this.removeFromWorld(this.level.enemies, index);
            } else if (!this.character.isTrampled(enemy) && this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    collisionThrowableObjectEnemy() {
        this.throwableObjects.forEach(throwableObject => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(throwableObject)) {
                    enemy.kill();
                    enemy.death_sound.play();
                    throwableObject.breakBottle();
                    this.removeFromWorld(this.level.enemies, index, 2000);
                }
            });
        });
    }

    collisionCharacterBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.collected_sound.play();
                this.removeFromWorld(this.level.bottles, index, 0);
                this.availableThrowObjects++;
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.availableThrowObjects == 0) {
                this.character.wrong_sound.play();
            } else if (this.availableThrowObjects > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
                this.availableThrowObjects--;
            }
        }
    }

    removeFromWorld(array, index, timeout) {
        setTimeout(() => {
            array.splice(index, 1);
        }, timeout);
    }

}
