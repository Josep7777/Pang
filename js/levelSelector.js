class levelSelector extends Phaser.Scene {
    constructor() {
        super({ key: "levelSelector" });
      }

    preload(){
    }

    loadText(){
      this.add.bitmapText(config.width - 1880, config.height - 170, 'publicPixelWhite', this.infoText,30);
      this.timeBoard = this.add.bitmapText(config.width/2 + 350, config.height/2 -325, 'publicPixel', this.countDown,130);
      if(this.worldSelected == 1){
        this.actualWorldName = this.add.bitmapText(config.width/2 + 450, config.height/2 +260, 'publicPixelYellow', "",30);
        this.actualWorldStages = this.add.bitmapText(config.width/2 + 400, config.height/2 +400, 'publicPixelYellow', "",30);
      }      
  }

    create(){
      this.infoText = "CHOOSE THE CITY TO START.\nUSE JOYSTICK TO CHOOSE.\nPRESS BUTTON TO FINALIZE CHOICE.";
        this.worldSelected = gamePrefs.CURRENT_WORLD;
        this.nameworld1 = gamePrefs.WORLD1_NAME;
        this.nameworld2 = gamePrefs.WORLD2_NAME;
        this.nameworld3 = gamePrefs.WORLD3_NAME;
        this.numberStagesWorld1 = gamePrefs.STAGES_WORLD1;
        this.numberStagesWorld2 = gamePrefs.STAGES_WORLD2;
        this.numberStagesWorld3 = gamePrefs.STAGES_WORLD3;
        this.cursores = this.input.keyboard.createCursorKeys();
        this.add.sprite(config.width/2 + 3, config.height/2-95, "map");
        this.timer = 0;
        this.countDown = 9;    
        this.timeBoard;
        this.leftIsPress = false;
        this.rightIsPress = false;
        this.loadText()

        //WORLDS POINTS POSITIONS
        this.world1X = config.width/2 +790;
        this.wordl1Y = config.height/2-190;

        this.world2X =config.width/2 +590;
        this.wordl2Y = config.height/2-190;

        this.world3X =config.width/2 +520;
        this.wordl3Y = config.height/2-90;

        this.mark = this.add.sprite(this.world1X, this.wordl1Y, "markYellow");

    }
    updateText() {
      this.timeBoard.setText(Math.round(this.countDown));

      switch(this.worldSelected){
        case 1:
          this.actualWorldName.setText(this.nameworld1);
          this.actualWorldStages.setText(this.numberStagesWorld1);
          break;
        case 2:
          this.actualWorldName.setText(this.nameworld2);
          this.actualWorldStages.setText(this.numberStagesWorld2);
          break;
        case 3:
          this.actualWorldName.setText(this.nameworld3);
          this.actualWorldStages.setText(this.numberStagesWorld3);
          break;
      }
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
      this.selectingLevel();
      this.updateText();
      if(this.cursores.left.isDown && this.worldSelected != 1 && !this.leftIsPress){
        this.worldSelected--;
        this.leftIsPress = true;

      }else if(this.cursores.right.isDown && this.worldSelected != 3 && !this.rightIsPress){
        this.worldSelected++;
        this.rightIsPress = true;
      }
      if(this.cursores.left.isUp){
        this.leftIsPress = false;
      }
      if(this.cursores.right.isUp){
        this.rightIsPress = false;
      }

      if (this.cursores.space.isDown) {
        this.playLevel();
      }
    }

    selectingLevel(){
      switch(this.worldSelected){
        case 1:
          this.mark.x = this.world1X;
          this.mark.y = this.wordl1Y + 5;
          break;
        case 2:
          this.mark.x = this.world2X;
          this.mark.y = this.wordl2Y + 5;
          break;
        case 3:
          this.mark.x = this.world3X;
          this.mark.y = this.wordl3Y + 5;
          break;
      }
    }
    playLevel(){

      switch(this.worldSelected){
        case 1:
          this.scene.start("level1_1");
          break;
        case 2:
          this.scene.start("level1_4");
          break;
        case 3:
          this.scene.start("level1_7");
          break;
        
      }
      
    }
}