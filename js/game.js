let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas'); // der Variable canvas weisen wir das canvas aus dem index HTML zu
    world = new World(canvas); // Variable world, legen neues Objekt namens world an, der geben wir canvas als Variable mit; wir können bei Erstellung diverse Variablen an Objekte mitgeben
    ctx = canvas.getContext('2d');

    console.log('My Character is ', world['character']);
}
