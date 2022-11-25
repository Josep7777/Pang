class owlPrefab extends enemyPrefab {
  constructor(_scene, _positionX, _positionY, _spriteTag = "owl") {
    super(_scene, _positionX, _positionY, _spriteTag).setScale(3);
    this.lives = 2;
    this.isGoingtoDie = false;
    this.scene = _scene;
    this.body.allowGravity = false;
    this.invencible = false;

    _scene.physics.add.overlap(
      this,
      _scene.player1,
      this.hitPlayer,
      null,
      this
    );
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.isGoingtoDie) {
      this.anims.play("owlFly", true);

      this.body.setVelocityX(gamePrefs.OWL_SPEED * this.direccion);

      if (this.x > config.width+100 || this.x < 0-100){
        this.y+=gamePrefs.OWL_CHANGE_Y;
        this.direccion *= -1;
        this.body.setVelocityX(gamePrefs.OWL_SPEED * this.direccion);
        this.flipX = !this.flipX;
      }
    }
  }

  hit() {
    if (!this.invencible) {
      if (this.lives <= 0) {
        this.anims.play("enemyDeath", false);
        this.isGoingtoDie = true;
        this.body.setVelocityX(0);
        this.once("animationcomplete", () => {
          this.destroy();
        });
      } else {
        this.anims.play("owlHit", false);
        this.isGoingtoDie = true;
        this.invencible = true;
        this.body.setVelocityX(0);
        this.enemyTimer = this.scene.time.addEvent({
          delay: 1000, //ms
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

  hitPlayer(_enemy, _player){
    _player.canShoot=false;
    this.enemyTimer = this.scene.time.addEvent({
      delay: 3000, //ms
      callback: _player.canShootAgain,
      callbackScope: _player,
      repeat: 0,
    });
    this.lives=0;
    this.hit();
  }
}
