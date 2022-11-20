class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: "levelSelector" });
      }

    preload(){
        //Pre cargamos los recursos
        this.load.setPath("assets/img/");
        this.load.image("map","map.png");
        this.infoText = "CHOOSE THE CITY TO START.\nUSE JOYSTICK TO CHOOSE.\nPRESS BUTTON TO FINALIZE CHOICE.";
        this.worldSelected = gamePrefs.CURRENT_WORLD;



    }

    loadText(){
      this.add
      .text(config.width - 1600, config.height - 100, this.infoText, {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);

      this.timeBoard = this.add
      .text(config.width/2 + 400, config.height/2 -250, this.countDown, {
        fontFamily: "Public Pixel",
        fill: "#000000",
        stroke: "#000000",
      })
      .setOrigin(0.5)
      .setScale(10);
  }

    create(){
        this.cursores = this.input.keyboard.createCursorKeys();
        this.add.sprite(config.width/2 + 3, config.height/2-95, "map");
        this.timer = 0;
        this.countDown = 9;    
        this.timeBoard;
        this.loadText()
    
    }
    updateText() {
      this.timeBoard.setText(Math.round(this.countDown));
    }
    update(time, delta){
      this.timer += delta;
      if (this.timer > 1000) {
        this.resources += 1;
        this.timer -= 1000;
        this.countDown -= 1;
      }
      if (this.countDown <= 0) {
        this.playLevel();
      }
      this.updateText();
      
      if (this.cursores.space.isDown) {
        this.playLevel();
    }
    }

    playLevel(){
      this.scene.start("pang");
    }
}