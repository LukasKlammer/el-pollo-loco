class Keyboard {
    LEFT = false; // keycode: 
    RIGHT = false; // keycode: 
    UP = false; // keycode: 
    DOWN = false; // keycode: 
    SPACE = false; // keycode: 

    checkKeyboardPress(keyboardEvent) {
        console.log(keyboardEvent);
        console.log('keycode', keyboardEvent.keyCode);

        switch (keyboardEvent.keyCode) {
            case 37:
                alert('left');
                this.LEFT = true;
                break;
            case 38:
                alert('up');
                this.UP = true;
                break;
            case 39:
                alert('right');
                this.RIGHT = true;
                break;
            case 40:
                alert('down');
                this.DOWN = true;
                break;
        }
    }


}


