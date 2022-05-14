class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    level_end_x = 2200;
    coins;

    // sobald Level erstellt wird wird sie aufgerufen
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}