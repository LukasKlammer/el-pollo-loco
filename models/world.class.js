class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
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

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);// draw() Methode kann den context ctx nutzen und kann auf diesen verschiedene Methoden aufrufen, um Welt zu malen
        // this.character.img ist das Bild
        // this braucht es, weil wir von dieser Welt auf context zugreifen wollen, alle Variablen aus dieser Klasse mit this öffnen

        
        // for (let i = 0; i < this.enemies.length; i++) {
        //     const enemy = this.enemies[i];
        //     this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        // }

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height); // wird ausgeführt für jedes Element aus enemies: ganze einfach auf enemy zugreifen
        });

        let self = this;
        requestAnimationFrame(function() { // ins requestAnimationFrame wird eine Funktion reingegeben, die wird ausgeführt, sobald alles drüber fertig gezeichnet wurde (asynchron)
            self.draw(); // Problem: this kennt er da drin nicht mehr: Variable namens self und this da zuweisen, dann geht es
                        // draw() wird immer wieder aufgerufen
        }); // in Methode wird draw() so häufig aufgerufen, wie es die Grafikkarte hergibt: 10-60 mal pro Sekunde
    }
}