let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas'); // der Variable canvas weisen wir das canvas aus dem index HTML zu
    world = new World(canvas); // Variable world, legen neues Objekt namens world an, der geben wir canvas als Variable mit; wir können bei Erstellung diverse Variablen an Objekte mitgeben

    console.log('My Character is ', world['character']);
}


window.addEventListener('keydown', (ev) => { // arrow Tasten werden nur mit keydown erkannt
    keyboard.checkKeyboardPress(ev);
})

window.addEventListener('keyup', (ev) => {
    alert('key up');
});