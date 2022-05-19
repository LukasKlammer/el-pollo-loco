class World {

    character = new Character();
    level = level1;
    canvas; // (--> siehe unten im constructor)
    ctx; // Variable context
    keyboard;
    camera_x = 0;
    isGameOver = false;
    lifeStatusBar = new StatusBar(0, 'life', 100);
    bottlesStatusBar = new StatusBar(40, 'bottles', 0);
    coinsStatusBar = new StatusBar(80, 'coins', 0);
    throwableObjects = [];
    background_sound = new Audio('./audio/background_music.mp3');


    constructor(canvas, keyboard) { // wird aus init() mitgegeben
        this.ctx = canvas.getContext('2d'); // in unser Objekt World wird canvas hineingegeben, später wollen wir dort Welt reinzeichnen
        // nicht direkt auf canvas malen möglich, sondern nur mit .getContext('2d')

        this.canvas = canvas; // dem canvas von oben (HIER) wird das übergebene canvas zugewiesen
        this.keyboard = keyboard;
        this.setWorld();
    }


    startWorld() {
        console.log('startWorld() richtig ausgeführt in world.class');
        this.character.start();
        this.level.startLevel();
        this.draw(); // draw Methode haben wir bereits unten
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
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        // ----- space for fixed objects ----- //
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.lifeStatusBar);
        this.addToMap(this.bottlesStatusBar);
        this.addToMap(this.coinsStatusBar);

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
        // mo.drawFrame(this.ctx); // draw a visible frame around objects to see collisions

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
            if (!this.isGameOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkStartEndboss();
                this.checkGameOver();
                this.background_sound.play();
            } else if (this.isGameOver) {
                this.background_sound.pause();
            }
        }, 100);

    }


    checkCollisions() {
        this.collisionEnemyCharacter();
        this.collisionThrowableObjectEnemy();
        this.collisionCharacterBottle();
        this.collisionCharacterCoin();
        this.collisionCharacterEndboss();
    }


    collisionEnemyCharacter() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isTrampling(enemy) && enemy.height < 300 && enemy.energy > 0) { // avoid to kill endboss by trampling
                enemy.kill();
                enemy.death_sound.play();
                this.removeFromWorld(this.level.enemies, index, 3000);
            } else if (!this.character.isTrampling(enemy) && this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit(5);
                this.lifeStatusBar.setPercentage(this.character.energy, 100);
            }
        });
    }


    collisionThrowableObjectEnemy() {
        this.throwableObjects.forEach(throwableObject => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.isColliding(throwableObject) && throwableObject.energy > 0) {
                    enemy.hit(20);
                    throwableObject.breakBottle();
                    if (enemy.energy <= 0) {
                        enemy.death_sound.play();
                        this.removeFromWorld(this.level.enemies, index, 3000);
                    }
                }
            });
        });
    }


    collisionCharacterBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.collected_sound.play();
                this.removeFromWorld(this.level.bottles, index, 0);
                this.character.availableThrowObjects++;
                this.bottlesStatusBar.setPercentage(this.character.availableThrowObjects, 10);
            }
        });
    }


    collisionCharacterCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.collected_sound.play();
                this.removeFromWorld(this.level.coins, index, 0);
                this.character.availableCoins++;
                this.coinsStatusBar.setPercentage(this.character.availableCoins, 10);
            }
        });
    }


    collisionCharacterEndboss() {
        if (this.character.isColliding(this.level.enemies[0])) {
            this.level.enemies[0].attack = true;
            this.character.hit(30);
        } else {
            this.level.enemies[0].attack = false;
        }
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            if (this.character.availableThrowObjects == 0) {
                this.character.wrong_sound.play();
            } else if (this.character.availableThrowObjects > 0 && this.character.timePassedAfterThrow()) {
                this.character.lastThrow = new Date().getTime();
                let throwableObject = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(throwableObject);
                this.character.availableThrowObjects--;
                this.bottlesStatusBar.setPercentage(this.character.availableThrowObjects, 10);
            }
        }
    }


    // endboss should start when character neares him and if endboss isn't hurt or dead
    checkStartEndboss() {
        if (this.distanceCharacterEndboss() < 450 && !this.level.enemies[0].isHurt() && !this.level.enemies[0].isDead()) {
            this.level.enemies[0].speed = 2;
        }
    }


    distanceCharacterEndboss() {
        let distance = this.level.enemies[0].x - this.character.x;
        return distance;
    }


    removeFromWorld(array, index, timeout) {
        setTimeout(() => {
            array.splice(index, 1);
        }, timeout);
    }


    checkGameOver() {
        if (this.character.isDead()) {
            document.getElementById('lost-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.stopAllEnemies();
            this.character.death_sound.play();
        } else if (this.level.enemies[0].isDead()) {
            document.getElementById('game-over-screen').classList.remove('d-none');
            this.isGameOver = true;
            this.stopAllEnemies();
        }
    }


    stopAllEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.speed = 0;
        });
    }

}
