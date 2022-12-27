class ballPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY, _tag, _direct) {
    super(_scene, _posX, _posY, _tag);

    _scene.add.existing(this);
    this.direct = _direct;
    _scene.physics.add.overlap(this, _scene.floorD, this.bounce, null, this);

    _scene.physics.add.overlap(
      this,
      _scene.floorU,
      this.bounceTecho,
      null,
      this
    );
    _scene.physics.add.overlap(this, _scene.wall, this.bounceP, null, this);
    _scene.physics.add.overlap(this, _scene.wallR, this.bounceP, null, this);
  }

  bounce(_ball, _floorD) {
    _ball.body.setVelocityY(
      -(gamePrefs.GRAVITY * (gamePrefs.VELOCITY_MAKER2 - _ball.scale))
    );
    _ball.body.setVelocityX(
      gamePrefs.BALL_SPEED *
        (gamePrefs.VELOCITY_MAKER - _ball.scale) *
        _ball.direct
    );
  }

  bounceP(_ball, _wall) {
    _ball.direct = _ball.direct * -1; //CAMBIAMOS DIRECCION
    _ball.body.setVelocityX(
      gamePrefs.BALL_SPEED *
        (gamePrefs.VELOCITY_MAKER + _ball.scale) *
        _ball.direct
    );
  }

  bounceTecho(_ball, _wall) {
    _ball.body.setVelocityY(
      gamePrefs.GRAVITY * (gamePrefs.VELOCITY_MAKER2 - _ball.scale)
    );
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > 0 && this.x < 60) this.destroy();
    if (this.x > config.width-60 && this.x < config.width) this.destroy();
  }
}
