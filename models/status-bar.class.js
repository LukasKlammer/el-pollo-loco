class StatusBar extends DrawableObject {

    IMAGES_LIFE_BARS = [
        '../img/7.Marcadores/Barra/Marcador vida/verde/0_.png', // Pfad 0
        '../img/7.Marcadores/Barra/Marcador vida/verde/20_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/40_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/60_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/80_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/100_.png' // Pfad 5
    ]

    IMAGES_BOTTLES_BARS = [
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/0_.png', // Pfad 0
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/20_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/40_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/1000_.png' // Pfad 5
    ]

    IMAGES_COINS_BARS = [
        '../img/7.Marcadores/Barra/Marcador vida/verde/0_.png', // Pfad 0
        '../img/7.Marcadores/Barra/Marcador vida/verde/20_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/40_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/60_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/80_.png',
        '../img/7.Marcadores/Barra/Marcador vida/verde/100_.png' // Pfad 5
    ]

    percentage = 100;
    
    /**
     * 
     * @param {*} y 
     * @param {string} whichStatusBar 
     */
    constructor(y, whichStatusBar) {
        console.log(whichStatusBar);
        super(); // muss immer rein --> Methoden vom übergeordneten Objekt initialisieren
        this.loadImages(this.IMAGES_LIFE_BARS);
        this.x = 40;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100); // muss am Anfang mal aufgerufen werden
    }

    /**
     * sets the percentage
     * 
     * @param {integer} percentage gives in the percentage as a number
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Zahl zwischen 0 und 5 ermitteln
        let i = this.resolveImageIndex();
        let path = this.IMAGES_LIFE_BARS[i];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}