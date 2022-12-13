class foodPrefab extends Phaser.GameObjects.Sprite {
  constructor(scene, positionX, positionY, _tipo) {
    super(scene, positionX, positionY, "food" + _tipo).setScale(3);
    scene.add.existing(this);

    scene.physics.add.overlap(
      scene.player1,
      this,
      this.getPoints,
      null,
      this
    );

    this.powerUpTimer = scene.time.addEvent({
      delay: gamePrefs.POWERUP_DESTROY_TIMER, //ms
      callback: this.destroyFood,
      callbackScope: this,
      repeat: 0,
    });

    this.scene = scene;
  }

  destroyFood() {
    if (this.scene != null) {
      var i = 0;
      this.tintTimer = this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          if (i % 2 == 0) this.tint = 0xffffff;
          else this.tint = 0x9b9b9b;

          i++;
          if (i >= 20) this.destroy();
        },
        callbackScope: this,

        repeat: 20,
      });
    }
  }

  getPoints(_player, _food) {
    this.scene._hud.setScore(500);
    this.destroy();
  }
}