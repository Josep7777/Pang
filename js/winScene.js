class winScene extends Phaser.Scene {
  constructor() {
    super({ key: "winScene" });
  }

  preload() {}

  create() {
    this.sound.stopAll();
    this.cursores = this.input.keyboard.createCursorKeys();
    this.score = gamePrefs.SCORE;
    this.timerBonus = gamePrefs.TIMER * 100;
    this.stageNumber = gamePrefs.STAGE;
    this.add
      .sprite(config.width / 2, config.height - 500, "winImage")
      .setScale(1.5);
    //SCORE
    this.add
      .text(config.width / 2, config.height - 250, this.stageNumber + "STAGE", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);

    this.add
      .text(
        config.width / 2,
        config.height - 150,
        "TIME BONUS    " + this.timerBonus + "PTS",
        {
          fontFamily: "Public Pixel",
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
        }
      )
      .setOrigin(0.5)
      .setScale(2);

    this.add
      .text(
        config.width / 2,
        config.height - 80,
        "NEXT EXTEND   " + this.timerBonus + "PTS",
        {
          fontFamily: "Public Pixel",
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
        }
      )
      .setOrigin(0.5)
      .setScale(2);
  }

  update() {
    if (this.cursores.space.isDown) {
      gamePrefs.PLAYER1HEALTH = 3;

      switch (gamePrefs.STAGE) {
        case 1:
          this.scene.start("level1_2");
          break;
        case 2:
          this.scene.start("level1_3");
          break;
        case 3:
          this.scene.start("worldCompleted");
          break;
        case 4:
          this.scene.start("level2_5");
          break;
        case 5:
          this.scene.start("level2_6");
          break;
        case 6:
          this.scene.start("worldCompleted");
          break;
        case 7:
          this.scene.start("level3_8");
          break;
        case 8:
          this.scene.start("level3_9");
          break;
        case 9:
          this.scene.start("worldCompleted");
          break;
        case 10:
          this.scene.start("level4_11");
          break;
        case 11:
          this.scene.start("level4_12");
          break;
        case 12:
          this.scene.start("worldCompleted");
          break;
        case 13:
          this.scene.start("level5_14");
          break;
        case 14:
          this.scene.start("level5_15");
          break;
        case 15:
          this.scene.start("worldCompleted");
          break;
        case 16:
          this.scene.start("level6_17");
          break;
        case 17:
          this.scene.start("level6_18");
          break;
        case 18:
          this.scene.start("worldCompleted");
          break;
        default:
          this.scene.start("level1_1");
          break;
      }
    }
  }
}
