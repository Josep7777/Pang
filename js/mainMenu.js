class mainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "mainMenu"});
    }
    preload(){
        this.load.setPath("assets/img/");
        this.load.image("logo", "pangLogo.gif");
        this.load.setPath("assets/fonts/");
        this.load.bitmapFont("publicPixel", "publicPixel.png", "publicPixel.xml");
        this.load.bitmapFont(
          "publicPixelWhite",
          "publicPixelWhite.png",
          "publicPixelWhite.xml"
        );
        this.load.bitmapFont(
          "publicPixelYellow",
          "publicPixelYellow.png",
          "publicPixelYellow.xml"
        );
    }
    create(){
        this.cursores = this.input.keyboard.createCursorKeys();
        this.flashText = false;
        this.timerText = 0;
        this.add.sprite(config.width / 2, config.height / 2 - 100, "logo").setScale(3.5);
        this.add.bitmapText(config.width / 2 -450, 660, "publicPixelWhite", "©MITCHEL  1989", 60);
        this.insertCoin = this.add.bitmapText(config.width / 2 -390, 780, "publicPixelWhite", "INSERT COIN", 60);
    }

    update(time, delta){
        if (this.cursores.space.isDown) {
            this.scene.start("levelSelector");
          }
        this.timerText += delta;
        if (this.timerText > 500) {
            if (this.flashText) {
              this.insertCoin.setVisible(true);
              this.flashText = false;
            } else if (!this.flashText) {
              this.insertCoin.setVisible(false);
              this.flashText = true;
            }
            this.timerText = 0;
          }
    }
}