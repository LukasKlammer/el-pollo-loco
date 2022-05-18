class StatusBar extends DrawableObject {

    // percentage = 0;
    typeOfStatusBar;

    IMAGES_LIFE_BARS = [
        './img/7.Marcadores/Barra/Marcador vida/azul/0_.png', // Pfad 0
        './img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        './img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        './img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        './img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        './img/7.Marcadores/Barra/Marcador vida/azul/100_.png' // Pfad 5
    ]

    IMAGES_BOTTLES_BARS = [
        './img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        './img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        './img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        './img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        './img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        './img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png',
    ]

    IMAGES_COINS_BARS = [
        './img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        './img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        './img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        './img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        './img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        './img/7.Marcadores/Barra/Marcador moneda/azul/100_.png' 
    ]

    /**
     * 
     * @param {integer} y from top of canvas - places StatusBar on the y offset
     * @param {string} typeOfStatusBar - for example life, bottles or coins
     */
    constructor(y, typeOfStatusBar, initialPercentage) {
        super(); // muss immer rein --> Methoden vom übergeordneten Objekt initialisieren
        this.typeOfStatusBar = typeOfStatusBar;
        this.x = 40;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.findImageNamesStatusbar());
        this.renderStatusbar(initialPercentage);
    }


    findImageNamesStatusbar() {
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


    setPercentage(percentageValue, basisValue) {
        let percentage = this.calcPercentage(percentageValue, basisValue);
        this.renderStatusbar(percentage);
    }


    calcPercentage(percentageValue, basisValue) {
        let percentage = percentageValue / basisValue * 100;
        return percentage;
    }


    renderStatusbar(percentage) {
        let i = this.resolveImageIndex(percentage);
        let path = this.findImageNamesStatusbar()[i];
        this.img = this.imageCache[path];
    }


    resolveImageIndex(percentage) {
        if (percentage >= 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}