class StatusBar extends DrawableObject {


    percentage;
    typeOfStatusBar;


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
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png' // Pfad 5
    ]

    IMAGES_COINS_BARS = [
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/0_.png', // Pfad 0
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/20_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/40_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/60_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/80_.png',
        '../img/7.Marcadores/Barra/Marcador_botella/Verde/100_.png' // Pfad 5

    ]


    /**
     * 
     * @param {integer} y from top of canvas - places StatusBar on the y offset
     * @param {string} typeOfStatusBar - for example life, bottles or coins
     */
    constructor(y, typeOfStatusBar) {
        super(); // muss immer rein --> Methoden vom übergeordneten Objekt initialisieren
        this.typeOfStatusBar = typeOfStatusBar;
        this.loadImages(this.imagesOfStatusbar());
        this.x = 40;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.initalizePercentage();
        this.setPercentage(this.percentage); // muss am Anfang mal aufgerufen werden
    }

    imagesOfStatusbar() {
        switch (this.typeOfStatusBar) {
            case 'life':
                return this.IMAGES_LIFE_BARS;
                break;
            case 'bottles':
                return this.IMAGES_BOTTLES_BARS;
                break;
            case 'coins':
                return this.IMAGES_COINS_BARS;
                break;
        }
    }

    initalizePercentage() {
        switch (this.typeOfStatusBar) {
            case 'life':
                this.percentage = 100;
                break;
            case 'bottles':
                this.percentage = 0;
                break;
            case 'coins':
                this.percentage = 0;
                break;
        }
    }

    /**
     * sets the percentage
     * 
     * @param {integer} percentage gives in the percentage as a number
     */
    setPercentage(percentage, typeOfStatusBar) {
        this.percentage = percentage; // Zahl zwischen 0 und 5 ermitteln
        let i = this.resolveImageIndex();
        let path = this.imagesOfStatusbar()[i];
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