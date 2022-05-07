let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas'); // der Variable canvas weisen wir das canvas aus dem index HTML zu
    world = new World(canvas, keyboard); // Variable world, legen neues Objekt namens world an, der geben wir canvas als Variable mit; wir können bei Erstellung diverse Variablen an Objekte mitgeben

    console.log('My Character is ', world['character']);
}


window.addEventListener('keydown', (ev) => { // arrow Tasten werden nur mit keydown erkannt
    switch (ev.keyCode) {
        case 32:
            keyboard.SPACE = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 39:
            keyboard.RIGHT = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
    }

})

window.addEventListener('keyup', (ev) => { // wenn Taste losgelassen wir alle Variablen keyboard zurücksetzen (stoppt Bewegungen)
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
});