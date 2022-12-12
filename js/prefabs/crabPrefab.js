class crabPrefab extends enemyPrefab {
  constructor(_scene, _positionX, _positionY, _spriteTag = "crab") {
    super(_scene, _positionX, _positionY, _spriteTag).setScale(3);
    this.lives = 2;
    this.isGoingtoDie = false;
    this.scene = _scene;
    _scene.physics.add.collider(_scene.wallR, this);
    this.invencible = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (!this.isGoingtoDie) {
      this.anims.play("crabWalking", true);

      if (this.body.blocked.down) {
        this.body.setVelocityX(gamePrefs.CRAB_SPEED * this.direccion);
      }

      if (this.body.blocked.right) {
        this.direccion *= -1;
        this.body.setVelocityX(gamePrefs.CRAB_SPEED * this.direccion);
        this.flipX = !this.flipX;
      }

      if (this.x < 0) this.destroy();
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
}
