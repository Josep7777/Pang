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
      this.infoText = "YOU'VE GOT A LONG WAY TO GO.\n\n\nTAKE IT EASY.";
        this.worldSelected = gamePrefs.CURRENT_WORLD;
        this.nameworld1 = "MT.KEIRIN";
        this.numberStagesWorld1 = "STAGE   4-6";
        this.cursores = this.input.keyboard.createCursorKeys();
        this.add.sprite(config.width/2 + 3, config.height/2-95, "map");
        this.world1X = config.width/2 +790;
        this.wordl1Y = config.height/2-190;
        this.world2X =config.width/2 +590;
        this.wordl2Y = config.height/2-190;
        if(gamePrefs.STAGE == 3){
          this.actualWorldX = this.world1X;
          this.actualWorldY = this.wordl1Y;
        }
        this.plane = this.add.sprite(this.actualWorldX, this.actualWorldY, "plane").setRotation(29.9);
        this.planeSound = this.sound.add('airplaneSound', { loop: false });
        this.planeSound.play();
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
        this.plane.x -= 0.8;
      if (this.plane.x <= this.world2X) {
        this.planeSound.stop();
        this.scene.start("level1_4");
      }
    
    }
}