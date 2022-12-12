class bird1Prefab extends enemyPrefab {
  constructor(_scene, _positionX, _positionY, _spriteTag = "bird") {
    super(_scene, _positionX, _positionY, _spriteTag).setScale(3);
    this.lives = 2;
    this.isGoingtoDie = false;
    this.isDead = false;
    this.scene = _scene;
    this.body.allowGravity = false;
    _scene.physics.add.overlap(this, _scene.ballpool, this.hitBall, null, this);
    this.invencible = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.isGoingtoDie) {
      this.anims.play("bird1Fly", true);

      this.body.setVelocityX(gamePrefs.BIRD1_SPEED * this.direccion);

      if (this.x > config.width) this.destroy();
    }
  }

  hit() {
    if (!this.invencible) {
      if (this.lives <= 0) {
        this.isDead = true;
        this.anims.play("enemyDeath", false);
        this.isGoingtoDie = true;
        this.body.setVelocityX(0);
        this.once("animationcomplete", () => {
          this.destroy();
        });
      } else {
        this.anims.play("bird1Hit", false);
        this.isGoingtoDie = true;
        this.invencible = true;
        this.body.setVelocityX(0);
        this.enemyTimer = this.scene.time.addEvent({
          delay: 2000, //ms
          callback: this.startMoving,
          callbackScope: this,
          repeat: 0,
        });
      }
    }
  }

  startMoving() {
    this.invencible = false;
    this.isGoingtoDie = false;
  }

  hitBall(_enemy, _ballCol) {
    if (!this.invencible && !this.isDead) {
      this.lives--;
      this.hit();

      if (_ballCol.scaleX > 1) {
        //Si no es la pelota mas pequeña genera 2 nuevas mas pequeñas
        if (this.stopGravityBalls) {
          this.scene.createBall(_ballCol.x - 50, _ballCol.y, _ballCol.X - 1, 1);
          this.scene.createBall(
            _ballCol.x + 50,
            _ballCol.y,
            _ballCol.scaleX - 1,
            -1
          );
        } else {
          this.scene.createBall(_ballCol.x, _ballCol.y, _ballCol.scaleX - 1, 1);
          this.scene.createBall(
            _ballCol.x,
            _ballCol.y,
            _ballCol.scaleX - 1,
            -1
          );
        }
      }

      _ballCol.destroy();
    }
  }
}
