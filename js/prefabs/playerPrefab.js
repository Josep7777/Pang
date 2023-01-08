class playerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY, _tag,_playerNumber, _direct) {
    super(_scene, _posX, _posY, _tag,_playerNumber).setScale(3);

    _scene.add.existing(this);
    _scene.physics.world.enable(this);

    this.playerHealth = gamePrefs.PLAYER1HEALTH;
    this.FixShoot = false;
    this.doubleShoot = false;
    this.escaleraColider = false;
    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1; //Numero maximo de harpones que puede haber en pantalla
    this.isShooting = false;
    this.canShoot = true;
    this.damageAnim = false;
    this.cursores = _scene.input.keyboard.createCursorKeys();
    this.keyW = _scene.input.keyboard.addKey('W');
    this.keyA = _scene.input.keyboard.addKey('A');
    this.keyS = _scene.input.keyboard.addKey('S');
    this.keyD = _scene.input.keyboard.addKey('D');
    this.scene = _scene;
    this.spawn=true;
    
    this.enterOnce = true;
    this.body.setSize(this.width - 11, this.height - 7, true);
    //Cuando le das al espacio, el jugador dispara
      this.cursores.space.on(
        "down",
        function () {
          this.createBullet(_scene);
        },
        this
      );
    


    _scene.physics.add.overlap(
      this.scene.ladder,
      this,
      this.colisionLader,
      null,
      this
    );
  }

  colisionLader(_ladder, _player) {
    this.escaleraColider = true;
  }

  createBullet(_sceneParam) {
    //Crea el harpon cuando se presiona espacio
    if (this.FixShoot == true && this.doubleShoot == false) {
      this.LaserShootSound = this.scene.sound.add("ShootSound", {
        loop: false,
        volume: 0.5,
      });
      this.LaserShootSound.play();
      if (this.harpoonNumber < this.harpoonNumberMax && this.canShoot) {
        this.anims.play("shoot", false);
        this.isShooting = true;

        //Cuando la animacion de disparo acabe cambia el flag para volver al frame default

        this.once("animationcomplete", () => {
          this.isShooting = false;
          console.log("hazcosas2");
        });

        this.harpoonNumber++;

        var harpoon = _sceneParam.physics.add
          .image(this.x, this.y + 30, "harpoon")
          .setScale(3);
        harpoon.scaleY = 0;

        this.animation = _sceneParam.tweens.add({
          //Crea una animacion para alargar el harpon
          targets: harpoon,
          y: 0,
          scaleY: 8,
          duration: 2000,
        });

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.ballpool,
          _sceneParam.hitBall,
          null,
          _sceneParam
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.enemies,
          this.hitEnemy,
          null,
          this
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.floorU,
          this.countdownFix,
          null,
          this
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.destructivePlatforms,
          this.destroyHarpoonAndPlatform,
          null,
          this
        );
        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.normalPlatforms,
          this.destroyHarpoon,
          null,
          this
        );
      }
    } else if (this.doubleShoot == true) {
      this.LaserShootSound = this.scene.sound.add("LaserShootSound", {
        loop: false,
        volume: 0.3,
      });
      this.LaserShootSound.play();
      //IMPLEMENTARBALAS
      this.anims.play("shoot", true);
      this.isShooting = true;
      this.once("animationcomplete", () => {
        this.isShooting = false;
      });

      var _bullet = new bulletPrefab(this.scene, this.x, this.y);
      _sceneParam.physics.add.overlap(
        _bullet,
        _sceneParam.ballpool,
        _sceneParam.hitBall,
        null,
        _sceneParam
      );

      _sceneParam.physics.add.overlap(
        _bullet,
        _sceneParam.enemies,
        this.hitEnemyB,
        null,
        this
      );

      _sceneParam.physics.add.overlap(
        _bullet,
        _sceneParam.destructivePlatforms,
        this.destroyBulletAndPlatform,
        null,
        this
      );
      _sceneParam.physics.add.overlap(
        _bullet,
        _sceneParam.normalPlatforms,
        this.destroyBullet,
        null,
        this
      );
      _sceneParam.physics.add.overlap(
        _bullet,
        _sceneParam.normalPlatformsV,
        this.destroyBullet,
        null,
        this
      );
    } else {
      if (
        this.harpoonNumber < this.harpoonNumberMax &&
        this.canShoot &&
        this.doubleShoot == false
      ) {
        this.anims.play("shoot", false);
        this.isShooting = true;
        this.LaserShootSound = this.scene.sound.add("ShootSound", {
          loop: false,
          volume: 0.5,
        });
        this.LaserShootSound.play();
        //Cuando la animacion de disparo acabe cambia el flag para volver al frame default

        this.once("animationcomplete", () => {
          this.isShooting = false;
        });

        this.harpoonNumber++;

        var harpoon = _sceneParam.physics.add
          .image(this.x, this.y + 30, "harpoon")
          .setScale(3);
        harpoon.scaleY = 0;
        _sceneParam.tweens.add({
          //Crea una animacion para alargar el harpon
          targets: harpoon,
          y: 0,
          scaleY: 8,
          duration: 2000,
        });

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.ballpool,
          _sceneParam.hitBall,
          null,
          _sceneParam
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.enemies,
          this.hitEnemy,
          null,
          this
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.floorU,
          this.destroyHarpoon,
          null,
          this
        );

        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.destructivePlatforms,
          this.destroyHarpoonAndPlatform,
          null,
          this
        );
        _sceneParam.physics.add.overlap(
          harpoon,
          _sceneParam.normalPlatforms,
          this.destroyHarpoon,
          null,
          this
        );
      }
    }
  }

  countdownFix(_harpoon, _floor) {
    if (this.enterOnce) {
      this.animation.stop();
      _harpoon.body.setImmovable(true);
      _harpoon.body.setAllowGravity(false);
      _harpoon.body.setVelocityY(0);

      this.TimerFixFlash = this.scene.time.addEvent({
        delay: 2000, //ms
        callback: this.flash,
        args: [_harpoon],
        callbackScope: this,
        repeat: 0,
      });

      this.TimerFix = this.scene.time.addEvent({
        delay: 4000, //ms
        callback: this.destroyHarpoon,
        args: [_harpoon, _floor],
        callbackScope: this,
        repeat: 0,
      });
      this.enterOnce = false;
    }
  }

  hitEnemy(_harpoon, _enemy) {
    //Destruimos harpon y pelota
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
    _enemy.lives--;
    _enemy.hit();
  }

  hitEnemyB(_bullet, _enemy) {
    _bullet.destroy();
    _enemy.lives--;
    _enemy.hit();
  }

  destroyHarpoon(_harpoon, _floor) {
    this.enterOnce = true;
    //Destruye al harpon al tocar el techo
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
    if (this.FixShoot == true) this.FixShoot = false;
  }

  destroyBullet(_bullet, _floor) {
    _bullet.destroy();
  }
  destroyBulletAndPlatform(_bullet, _platform) {
    _bullet.destroy();
    _platform.destroy();
  }

  flash(_harpoon) {
    var i = 0;
    this.tintTimer = this.scene.time.addEvent({
      delay: 75,
      callback: () => {
        if (i % 2 == 0) _harpoon.tint = 0xffffff;
        else _harpoon.tint = 0xffff00;
        i++;
        if (i >= 26) _harpoon.tint = 0xffffff;
      },
      callbackScope: this,

      repeat: 26,
    });
  }

  destroyHarpoonAndPlatform(_harpoon, _platform) {
    //Destruye al harpon al tocar la plataforma
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();

    //Tambien destruye la plataforma
    _platform.destroy();
  }

  canShootAgain() {
    this.canShoot = true;
  }

  preUpdate(time, delta) {
      if (this.keyA.isDown) {
        if (!this.isShooting) {
          this.setFlipX(false);
          this.body.setVelocityX(-gamePrefs.CHARACTER_SPEED);
          this.anims.play("move", true);
        }
      } else if (this.keyD.isDown) {
        if (!this.isShooting) {
          this.setFlipX(true);
          this.body.setVelocityX(gamePrefs.CHARACTER_SPEED);
          this.anims.play("move", true);
        }
      } else {
        this.body.setVelocityX(0);
        if (!this.isShooting && !this.cursores.up.isDown && !this.damageAnim) {
          this.anims.stop();
          this.setFrame(4);
        }
      }
      if (this.escaleraColider) {
        if (this.keyW.isDown) {
          this.y -= gamePrefs.CHARACTER_SPEEDLADDER;
          this.anims.play("playerladder", true);
        }
      } else {
       // this.body.gravity=0;
        //ESTAS ENCIMA DE LA ESCALERA O ESTAS CAYENDO
        this.body.setVelocityY(-gamePrefs.GRAVITYCHARACTER);
        this.body.GRAVITYCHARACTER=0;
      }
  
      this.escaleraColider = false;
  
    

    super.preUpdate(time, delta);
  }
}
