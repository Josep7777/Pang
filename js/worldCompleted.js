class worldCompleted extends Phaser.Scene {
    constructor() {
        super({ key: "worldCompleted" });
      }

    preload(){
    }

    loadText(){
      this.add.bitmapText(config.width - 1880, config.height - 170, 'publicPixelWhite', this.infoText,30);
      if(this.worldSelected == 1){
        this.actualWorldName = this.add.bitmapText(config.width/2 + 450, config.height/2 +260, 'publicPixelYellow', this.nameworld1,30);
        this.actualWorldStages = this.add.bitmapText(config.width/2 + 400, config.height/2 +400, 'publicPixelYellow', this.numberStagesWorld1,30);
      }
      
      
  }

    create(){
        gamePrefs.STAGE = 3;
      this.infoText = "CHOOSE THE CITY TO START.\nUSE JOYSTICK TO CHOOSE.\nPRESS BUTTON TO FINALIZE CHOICE.";
        this.worldSelected = gamePrefs.CURRENT_WORLD;
        this.nameworld1 = "MT.FUJI";
        this.numberStagesWorld1 = "STAGE   1-3";
        this.cursores = this.input.keyboard.createCursorKeys();
        this.add.sprite(config.width/2 + 3, config.height/2-95, "map");
        this.plane = this.add.sprite(config.width/2 +790, config.height/2-180, "plane");
        this.timer = 0;
        this.countDown = 9;    
        this.timeBoard;
        this.loadText()
    }
    updateText() {
      this.actualWorldName.setText(this.nameworld1);
    }
    update(time, delta){
      this.updateText();
      this.plane.x =- 0.2;
      if (this.cursores.space.isDown) {
        this.playLevel();
      }
    }

    playLevel(){
      if(gamePrefs.STAGE == 3)
        this.scene.start("level1_4");
    }
}