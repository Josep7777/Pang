class hudPrefab extends Phaser.GameObjects.GameObject {
  constructor(
    _scene,
    _levelName,
    _worldNumber,
    _stageNumber,
    _highScore,
    _score,
    _countDown
  ) {
    super(_scene);
    _scene.add.existing(this);
    this.scene = _scene;
    this.levelName = _levelName;
    this.worldNumber = _worldNumber;
    this.stageNumber = _stageNumber;
    this.highScore = _highScore;
    this.score = _score;
    this.countDown = _countDown;
    this.loadText();
    this.flashText = false;
    this.timerText = 0;
    this.timer = 0;
  }
  preUpdate(time, delta) {
    this.timer += delta;
    this.timerText += delta;
    this.updateText();

    if (this.timer > 1000) {
      this.timer -= 1000;
      this.countDown -= 1;
    }

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

  loadText() {
    //PLAYERS
    this.scene.add.bitmapText(130, 730, "publicPixelWhite", "PLAYER-1", 30);
    this.scene.add.bitmapText(1430, 730, "publicPixelWhite", "PLAYER-2", 30);

    //NOMBRE DEL MUNDO ACTUAL
    this.scene.add.bitmapText(890, 730, "publicPixelWhite", this.levelName, 30);
    //NUMERO DE MUNDO Y NIVEL
    this.scene.add.bitmapText(
      860,
      810,
      "publicPixelWhite",
      this.worldNumber + "-" + this.stageNumber + " STAGE",
      30
    );
    //HIGH SCORE
    this.scene.add.bitmapText(
      840,
      860,
      "publicPixelWhite",
      "HI: " + this.highScore,
      30
    );

    //INSERT COIN
    this.insertCoin = this.scene.add.bitmapText(
      1390,
      810,
      "publicPixelWhite",
      "INSERT COIN",
      30
    );

    //SCORE
    this.scoreBoard = this.scene.add.bitmapText(
      389,
      777,
      "publicPixelWhite",
      this.score,
      30
    );

    //TIMER
    this.timeBoard = this.scene.add.bitmapText(
      1350,
      50,
      "publicPixelWhite",
      "TIME:0" + this.countDown,
      65
    );
    this.player1GameOver = this.scene.add.bitmapText(
      120,
      830,
      "publicPixelWhite",
      "GAME OVER!",
      30
    );
    this.gameOverText = this.scene.add.bitmapText(
      config.width / 2 - 250,
      config.height / 2 - 100,
      "publicPixelWhite",
      "GAME OVER",
      65
    );

    this.player1GameOver.setVisible(false);
    this.gameOverText.setVisible(false);
  }

  updateText() {
    //SCORE
    this.scoreBoard.setText(this.score);
    this.timeBoard.setText("TIME:0" + Math.round(this.countDown));
  }
  setScore(param) {
    this.score += param;
    this.scoreBoard.setText(this.score);
  }
  setGameOverText() {
    this.player1GameOver.setVisible(true);
    this.gameOverText.setVisible(true);
  }
}
