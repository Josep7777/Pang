class worldCompleted extends Phaser.Scene {
  constructor() {
    super({ key: "worldCompleted" });
  }

  preload() {}

  loadText() {
    this.infoText = this.add.bitmapText(
      config.width - 1880,
      config.height - 170,
      "publicPixelWhite",
      "",
      30
    );
    if (this.worldSelected == 1) {
      this.actualWorldName = this.add.bitmapText(
        config.width / 2 + 450,
        config.height / 2 + 260,
        "publicPixelYellow",
        this.nameworld1,
        30
      );
      this.actualWorldStages = this.add.bitmapText(
        config.width / 2 + 400,
        config.height / 2 + 400,
        "publicPixelYellow",
        this.numberStagesWorld1,
        30
      );
    }
  }

  create() {
    this.worldSelected = gamePrefs.CURRENT_WORLD;
    this.nameworld1 = "MT.KEIRIN";
    this.numberStagesWorld1 = "STAGE   4-6";
    this.cursores = this.input.keyboard.createCursorKeys();
    this.add.sprite(config.width / 2 + 3, config.height / 2 - 95, "map");

    this.world1X = config.width / 2 + 790;
    this.wordl1Y = config.height / 2 - 190;
    this.world2X = config.width / 2 + 590;
    this.wordl2Y = config.height / 2 - 190;
    this.world3X = config.width / 2 + 520;
    this.wordl3Y = config.height / 2 - 90;
    this.world4X = config.width / 2 + 600;
    this.wordl4Y = config.height / 2 - 90;
    this.world5X = config.width / 2 + 760;
    this.wordl5Y = config.height / 2 + 110;
    this.world6X = config.width / 2 + 420;
    this.wordl6Y = config.height / 2 - 100;
    switch (gamePrefs.STAGE) {
      case 3:
        this.actualWorldX = this.world1X;
        this.actualWorldY = this.wordl1Y;
        this.plane = this.add
          .sprite(this.actualWorldX, this.actualWorldY, "plane")
          .setRotation(29.9);
        this.fly = 1;
        break;
      case 6:
        this.actualWorldX = this.world2X;
        this.actualWorldY = this.wordl2Y;
        this.plane = this.add
          .sprite(this.actualWorldX, this.actualWorldY, "plane")
          .setRotation(35.1);
        this.fly = 2;
        break;
      case 9:
        this.actualWorldX = this.world3X;
        this.actualWorldY = this.wordl3Y;
        this.plane = this.add
        .sprite(this.actualWorldX, this.actualWorldY, "plane")
        .setRotation(45.6);
        this.fly = 3;
        break;
      case 12:
        this.actualWorldX = this.world4X;
        this.actualWorldY = this.wordl4Y;
        this.plane = this.add
        .sprite(this.actualWorldX, this.actualWorldY, "plane")
        .setRotation(27.6);
        this.fly = 4;
        break;
      case 15:
        this.actualWorldX = this.world5X;
        this.actualWorldY = this.wordl5Y;
        this.plane = this.add
        .sprite(this.actualWorldX, this.actualWorldY, "plane")
        .setRotation(30.4);
        this.fly = 5;
        break;
      case 18:
        this.actualWorldX = this.world6X;
        this.actualWorldY = this.wordl6Y;
        this.plane = this.add
        .sprite(this.actualWorldX, this.actualWorldY, "plane")
        .setRotation(35.2);
        this.fly = 6;
        break;
    }

    this.planeSound = this.sound.add("airplaneSound", { loop: false });
    this.planeSound.play();
    this.timer = 0;
    this.countDown = 9;
    this.timeBoard;
    this.loadText();
  }
  updateText() {
    this.actualWorldName.setText(this.nameworld1);
  }
  update(time, delta) {
    this.updateText();

    switch (this.fly) {
      case 1:
        this.infoText.setText(
          "YOU'VE GOT A LONG WAY TO GO.\n\n\nTAKE IT EASY."
        );
        this.plane.x -= 0.8;
        if (this.plane.x <= this.world2X) {
          this.planeSound.stop();
          this.scene.start("level2_4");
        }
        break;
      case 2:
        this.infoText.setText(
          "YOU CAN BREAK SOME BLOCKS\n\n\nTHERE ARE HIDDEN SOMEWHERE"
        );
        this.plane.x -= 0.5;
        this.plane.y += 0.8;
        if (this.plane.y >= this.wordl3Y) {
          this.planeSound.stop();
          this.scene.start("level3_7");
        }
        break;
      case 3:
        this.infoText.setText(
          "SORRY, CAN'T USE THE WIRE\n\n\nCONTINOUSLY. ONE AT TIME."
        );
        this.plane.x += 0.5;
        console.log(this.plane.x);
        if (this.plane.x >= 1550) {
          this.planeSound.stop();
          this.scene.start("level4_10");
        }
        break;
      case 4:
        this.infoText.setText(
          "SORRY, CAN'T USE THE WIRE\n\n\nCONTINOUSLY. ONE AT TIME."
        );
        this.plane.x += 0.65;
        this.plane.y += 1;
        if (this.plane.x >= 1700) {
          this.planeSound.stop();
          this.scene.start("level5_13");
        }
        break;
        case 5:
          this.infoText.setText(
            "SORRY, CAN'T USE THE WIRE\n\n\nCONTINOUSLY. ONE AT TIME."
          );
          this.plane.x -= 1.5;
          this.plane.y -= 0.9;
          if (this.plane.y <= this.wordl6Y) {
            this.planeSound.stop();
            this.scene.start("level1_16");
          }
          break;
    }
  }
}
