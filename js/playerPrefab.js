class playerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY, _tag, _direct) {
    super(_scene, _posX, _posY, _tag).setScale(3);

    _scene.add.existing(this);
    _scene.physics.world.enable(this);

    this.playerHealth = gamePrefs.PLAYER1HEALTH;

    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1; //Numero maximo de harpones que puede haber en pantalla
    this.isShooting = false;
    this.cursores = _scene.input.keyboard.createCursorKeys();
    //Cuando le das al espacio, el jugador dispara
    this.cursores.space.on(
      "down",
      function () {
        _scene.createBullet();
      },
      this
    );
  }

  preUpdate(time, delta) {
    if (this.cursores.left.isDown) {
      if (!this.isShooting) {
        this.setFlipX(false);
        this.body.setVelocityX(-gamePrefs.CHARACTER_SPEED);
        this.anims.play("move", true);
      }
    } else if (this.cursores.right.isDown) {
      if (!this.isShooting) {
        this.setFlipX(true);
        this.body.setVelocityX(gamePrefs.CHARACTER_SPEED);
        this.anims.play("move", true);
      }
    } else {
      this.body.setVelocityX(0);
      if (!this.isShooting) {
        this.anims.stop();
        this.setFrame(4);
      }
    }

    super.preUpdate(time, delta);
  }
}
