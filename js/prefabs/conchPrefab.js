class conchPrefab extends enemyPrefab {
  constructor(_scene, _positionX, _positionY, _spriteTag = "conch") {
    super(_scene, _positionX, _positionY, _spriteTag).setScale(3);
    this.lives = 2;
    this.isGoingtoDie = false;
    this.scene = _scene;
    _scene.physics.add.collider(_scene.wallR, this);
    _scene.physics.add.collider(_scene.wall, this);
    _scene.physics.add.collider(_scene.floorU, this);
    _scene.physics.add.collider(_scene.destructivePlatforms, this);
    _scene.physics.add.collider(_scene.normalPlatformsV, this);
    _scene.physics.add.collider(_scene.normalPlatforms, this);
    this.invencible = false;
    this.direccion *= -1;
    this.player1 = _scene.player1;
    this.isOnTop = false;
    this.isAttacking = false;
    this.isDead = false;
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
      this.anims.play("conchDown", true);

      if (this.body.blocked.down && !this.isAttacking) {
        this.body.allowGravity = false;
        this.angle = 0;
        this.isOnTop = false;
        if (this.direccion > 0) this.direccion *= -1;
        this.body.setVelocityX(gamePrefs.CONCH_SPEED * this.direccion);
      }

      if (this.body.blocked.down && this.isAttacking) {
        this.lives = 0;
        this.hit();
      }

      if (this.body.blocked.left) {
        this.isOnTop = false;
        this.angle = 90;
        this.body.setVelocityY(gamePrefs.CONCH_SPEED * this.direccion);
      }

      if (this.body.blocked.right) {
        this.isOnTop = false;
        this.angle = 270;
        this.body.setVelocityY(gamePrefs.CONCH_SPEED * this.direccion);
      }

      if (this.body.blocked.up) {
        this.isOnTop = true;
        this.angle = 180;
        if (this.direccion < 0) this.direccion *= -1;
        this.body.setVelocityX(gamePrefs.CONCH_SPEED * this.direccion);
      }
      if (
        this.x >= this.player1.x - 10 &&
        this.x <= this.player1.x + 10 &&
        this.isOnTop
      )
        this.attack();
    }
  }

  attack() {
    this.body.setVelocityX(0);
    this.body.setVelocityY(gamePrefs.CONCH_FALLING_SPEED);
    this.body.allowGravity = true;
    this.isAttacking = true;
  }

  hit() {
    if (!this.invencible) {
      if (this.lives <= 0) {
        this.anims.play("enemyDeath", false);
        this.isGoingtoDie = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.once("animationcomplete", () => {
          this.destroy();
        });
      } else {
        this.isGoingtoDie = true;
        this.invencible = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
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

  hitPlayer(_enemy, _player) {
    if (!this.isDead) {
      _player.canShoot = false;
      this.enemyTimer = this.scene.time.addEvent({
        delay: 3000, //ms
        callback: _player.canShootAgain,
        callbackScope: _player,
        repeat: 0,
      });

      var i = 0;
      this.tintTimer = this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          if (i % 2 == 0) _player.tint = 0xffffff;
          else _player.tint = 0xffff00;

          i++;
          if (i >= 26) _player.tint = 0xffffff;
        },
        callbackScope: this,

        repeat: 26,
      });

      this.lives = 0;
      this.hit();
      this.isDead = true;
    }
  }
}
