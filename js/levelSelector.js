class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: "levelSelector" });
      }

    preload(){
        //Pre cargamos los recursos
        this.load.setPath("assets/img/");
        this.load.image("map","map.png");

        this.infoText = "CHOOSE THE CITY TO START."
        this.infoText2 = "USE JOYSTICK TO CHOOSE."
        this.infoText3 = "PRESS BUTTON TO FINALIZE CHOICE."
    }
    create(){
        this.add.sprite(config.width/2 + 3, config.height/2-95, "map");
        this.loadText();
    }
    update(){
        
    }

    loadText(){
        this.add
        .text(420, 770, this.infoText, {
          fontFamily: "Public Pixel",
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
        })
        .setOrigin(0.5)
        .setScale(2);

        this.add
        .text(420, 800, this.infoText2, {
          fontFamily: "Public Pixel",
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
        })
        .setOrigin(0.5)
        .setScale(2);
    }
}