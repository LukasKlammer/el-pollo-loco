let canvas;
let world = 0;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas'); // der Variable canvas weisen wir das canvas aus dem index HTML zu
    initLevel();
    world = new World(canvas, keyboard); // Variable world, legen neues Objekt namens world an, der geben wir canvas als Variable mit; wir können bei Erstellung diverse Variablen an Objekte mitgeben
    mobileDevice();
}


function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('instruction-manual').classList.add('d-none');
    document.getElementById('touchscreen-button-container').classList.remove('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    world.startWorld();
}


window.addEventListener('keydown', (ev) => { // arrow Tasten werden nur mit keydown erkannt
    switch (ev.keyCode) {
        case 13:
            init();
            break;
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
        case 68:
            keyboard.D = true;
            break;
        case 70:
            init();
            document.getElementById('canvas').requestFullscreen();
            break;
        case 82:
            reloadPage();
            break;
    }
})


window.addEventListener('keyup', (ev) => { // wenn Taste losgelassen wir alle Variablen keyboard zurücksetzen (stoppt Bewegungen)
    resetKeyboard();
});


function resetKeyboard() {
    keyboard.SPACE = false;
    keyboard.LEFT = false;
    keyboard.UP = false;
    keyboard.RIGHT = false;
    keyboard.D = false;
}


function mobileDevice() {
    document.getElementById('move-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('move-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('move-left').addEventListener('click', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('move-left').addEventListener('onmouseout', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('move-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('move-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('move-right').addEventListener('click', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('move-right').addEventListener('onmouseout', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById('throw').addEventListener('click', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('throw').addEventListener('onmouseout', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('jump').addEventListener('click', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump').addEventListener('onmouseout', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('restart').addEventListener('touchstart', (e) => {
        e.preventDefault();
        reloadPage();
    });
    document.getElementById('restart').addEventListener('touchend', (e) => {
        e.preventDefault();
    });
    document.getElementById('restart').addEventListener('click', (e) => {
        e.preventDefault();
        reloadPage();
    });
    document.getElementById('restart').addEventListener('onmouseout', (e) => {
        e.preventDefault();
    });
}


function reloadPage() {
    window.location.reload();
}
