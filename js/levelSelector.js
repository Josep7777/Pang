class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: "levelSelector" });
      }

    preload(){
        //Pre cargamos los recursos
        this.load.setPath("assets/img/");
        this.load.image("map","map.png");
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('publicPixel','publicPixel.png','publicPixel.xml');
        this.load.bitmapFont('publicPixelWhite','publicPixelWhite.png','publicPixelWhite.xml');
        this.load.bitmapFont('publicPixelYellow','publicPixelYellow.png','publicPixelYellow.xml');
        this.infoText = "CHOOSE THE CITY TO START.\nUSE JOYSTICK TO CHOOSE.\nPRESS BUTTON TO FINALIZE CHOICE.";
        this.worldSelected = gamePrefs.CURRENT_WORLD;
        this.nameworld1 = "MT.FUJI";
        this.numberStagesWorld1 = "STAGE   1-3";


    }

    loadText(){
      this.add.bitmapText(config.width - 1880, config.height - 170, 'publicPixelWhite', this.infoText,30);
      this.timeBoard = this.add.bitmapText(config.width/2 + 350, config.height/2 -325, 'publicPixel', this.countDown,130);
      if(this.worldSelected == 1){
        this.actualWorldName = this.add.bitmapText(config.width/2 + 450, config.height/2 +260, 'publicPixelYellow', this.nameworld1,30);
        this.actualWorldStages = this.add.bitmapText(config.width/2 + 400, config.height/2 +400, 'publicPixelYellow', this.numberStagesWorld1,30);
      }
      
      
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
      this.actualWorldName.setText(this.nameworld1);
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
      if(this.worldSelected == 1)
        this.scene.start("level1_4");
    }
}