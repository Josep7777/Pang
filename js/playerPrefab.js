class playerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY, _tag, _direct) {
    super(_scene, _posX, _posY, _tag).setScale(3);

    _scene.add.existing(this);
    _scene.physics.world.enable(this);

    this.playerHealth = gamePrefs.PLAYER1HEALTH;

    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1; //Numero maximo de harpones que puede haber en pantalla
    this.isShooting = false;
    this.canShoot=true;
    this.cursores = _scene.input.keyboard.createCursorKeys();
    //Cuando le das al espacio, el jugador dispara
    this.cursores.space.on(
      "down",
      function () {
        this.createBullet(_scene);
      },
      this
    );
  }

  createBullet(_sceneParam) {
    //Crea el harpon cuando se presiona espacio
    if (this.harpoonNumber < this.harpoonNumberMax && this.canShoot) {
      this.anims.play("shoot", false);
      this.isShooting = true;

      //Cuando la animacion de disparo acabe cambia el flag para volver al frame default

      this.once("animationcomplete", () => {
        this.isShooting = false;
      });

      this.harpoonNumber++;

      var harpoon = _sceneParam.physics.add
        .image(this.x, this.y, "harpoon")
        .setScale(3);
      harpoon.scaleY = 0;

      _sceneParam.tweens.add({
        //Crea una animacion para alargar el harpon
        targets: harpoon,
        y: 200,
        scaleY: 5,
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
    }
  }

  hitEnemy(_harpoon, _enemy){
    //Destruimos harpon y pelota
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
    _enemy.lives--;
    _enemy.hit()
    
    /*if(_enemy.lives<=0){
      _enemy.destroy();
    }*/
  }

  destroyHarpoon(_harpoon, _floor) {
    //Destruye al harpon al tocar el techo
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
  }

  destroyHarpoonAndPlatform(_harpoon, _platform) {
    //Destruye al harpon al tocar la plataforma
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();

    //Tambien destruye la plataforma
    _platform.destroy();
  }

  canShootAgain(){
    this.canShoot=true;
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
