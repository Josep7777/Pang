class level4_11 extends Phaser.Scene {
  constructor() {
    super({ key: "level4_11" });
  }

  preload() {}

  loadAnimations() {
    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("player1", { start: 4, end: 5 }),
      frameRate: 8,
      repeat: 0,
    });
    this.anims.create({
      key: "playerladder",
      frames: this.anims.generateFrameNumbers("player1", { start: 7, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "shield",
      frames: this.anims.generateFrameNumbers("escudo", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "doubleShoot",
      frames: this.anims.generateFrameNumbers("doubleShoot", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "crabWalking",
      frames: this.anims.generateFrameNumbers("crab", { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "crabDeath",
      frames: this.anims.generateFrameNumbers("crab", { start: 0, end: 5 }),
      frameRate: 7,
      repeat: 0,
    });
    this.anims.create({
      key: "bird1Fly",
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "bird1Hit",
      frames: this.anims.generateFrameNumbers("bird", { start: 6, end: 7 }),
      frameRate: 5,
      repeat: 4,
    });

    this.anims.create({
      key: "enemyDeath",
      frames: this.anims.generateFrameNumbers("enemyDeath", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "owlFly",
      frames: this.anims.generateFrameNumbers("owl", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "owlHit",
      frames: this.anims.generateFrameNumbers("owl", { start: 12, end: 13 }),
      frameRate: 5,
      repeat: 2,
    });

    this.anims.create({
      key: "conchDown",
      frames: this.anims.generateFrameNumbers("conch", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ballDestroy",
      frames: this.anims.generateFrameNumbers("ballExplosion", {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "dynamite",
      frames: this.anims.generateFrameNumbers("powerUp6", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });
  }

  loadPools() {
    this.ballpool = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.destructivePlatforms = this.physics.add.group();
    this.normalPlatformsV = this.physics.add.group();
    this.normalPlatforms = this.physics.add.group();
    this.ladder = this.physics.add.group();
    this.enemies = this.add.group();
    this.bullets = this.physics.add.group();
    this.food = this.physics.add.group();
  }

  create() {
    this.sound.stopAll();
    this.backgroundMusic = this.sound.add("EmeraldTemple", {
      loop: false,
      volume: 0.5,
    });
    this.backgroundMusic.play();
    //Cargamos las animaciones que tendra el juego
    this.loadAnimations();
    this.add.sprite(config.width / 2, config.height / 2 - 82, "background11");
    //Cargamos las pools
    this.loadPools();

    this.createWalls(); // Funcion para crear suelo, techo y paredes
    this.createPlatforms();
    //this.createStairs();

    gamePrefs.BALL_SPEED = gamePrefs.ORIGINAL_BALL_SPEED;

    //Creamos la pelota, le pasamos la x, la y, y la escala
    this.createBall(config.width / 2 + 300, config.height - 700, 4, 1);
    this.createBall(config.width / 2 - 300, config.height - 700, 3, -1);
    //this.createBall(config.width / 2 + 100, config.height - 600, 3, 1);
    //Añadimos al jugador con fisicas
    this.player1 = new playerPrefab(
      this,
      config.width / 2 - 250,
      config.height - 250,
      "player1"
    );

    //Variables del jugador
    this.invencible = false;
    this.timer2 = 0;
    this.dañoEscudo = false;
    this.resources = 0;

    //POSICION X/Y DEL FEEDBACK DEL POWER UP
    this.powerUp1FeedbackPosX = 400;
    this.powerUp1FeedbackPosY = 865;
    //POWER UP TIEMPO INMUNE
    this.timerPower = 5;

    this.countDown2 = 1;

    //Datos del HUD
    this.levelName = gamePrefs.WORLD4_NAME;
    this.worldNumber = 4;
    this.stageNumber = 11;
    this.highScore = 100000;
    this.timer = 0;
    this.countDown = 99;
    this.timeBoard;

    this.newLifes = 3;

    this.gameOverflag = false;
    this.restartGameOver = false;

    this.stopGravityBalls = false;

    //HUD de las vidas
    this.live1 = this.add
      .sprite(config.width - 1750, config.height - 50, "lifes")
      .setScale(4);
    this.live2 = this.add
      .sprite(config.width - 1690, config.height - 50, "lifes")
      .setScale(4);
    this.live3 = this.add
      .sprite(config.width - 1630, config.height - 50, "lifes")
      .setScale(4);

    //Funcion que crea los textos estaticos
    this._hud = new hudPrefab(
      this,
      this.levelName,
      this.worldNumber,
      this.stageNumber,
      this.highScore,
      this.score,
      this.countDown
    );

    //Creamos los cursores para input
    this.cursores = this.input.keyboard.createCursorKeys();

    //Añadimos colisiones
    this.physics.add.collider(this.floorD, this.player1);
    this.physics.add.collider(this.floorD, this.powerUps);
    this.physics.add.collider(this.floorD, this.food);
    this.physics.add.collider(this.floorD, this.enemies);
    this.physics.add.collider(this.wall, this.player1);
    this.physics.add.collider(this.wallR, this.player1);
    this.physics.add.collider(this.normalPlatformsV, this.player1);
    this.physics.add.collider(this.normalPlatforms, this.player1);
    this.physics.add.collider(
      this.ballpool,
      this.normalPlatformsV,
      this.collideBallPlatform
    );
    this.physics.add.collider(
      this.ballpool,
      this.normalPlatforms,
      this.collideBallPlatform
    );
    this.physics.add.collider(
      this.ballpool,
      this.destructivePlatforms,
      this.collideBallPlatform
    );

    this.physics.add.overlap(
      this.ballpool,
      this.player1,
      this.damagePlayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.player1,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );

    this.randomEnemySpawn = Phaser.Math.Between(10000, 30000);
    this.enemyTimer = this.time.addEvent({
      delay: this.randomEnemySpawn, //ms
      callback: this.createEnemy,
      callbackScope: this,
      repeat: 0,
    });

    this.randomFoodSpawn = Phaser.Math.Between(7000, 20000);
    this.foodTimer = this.time.addEvent({
      delay: this.randomFoodSpawn, //ms
      callback: this.createFood,
      callbackScope: this,
      repeat: 0,
    });
  }

  createFood(){
    var foodType = Phaser.Math.Between(1, 28);
    var randomXPos = Phaser.Math.Between(100, config.width - 100);
    var _food = new foodPrefab(this, randomXPos, 30, foodType);
    this.food.add(_food);
    _food.body.setSize(_food.width - 7, _food.height-10, true);

    this.randomFoodSpawn = Phaser.Math.Between(7000, 20000);
    this.foodTimer = this.time.addEvent({
      delay: this.randomFoodSpawn, //ms
      callback: this.createFood,
      callbackScope: this,
      repeat: 0,
    });
  }

  createStairs() {
    var _ladder1 = this.add
      .sprite(270, config.height - 340, "ladder")
      .setScale(4, 6);
    this.ladder.add(_ladder1);
    _ladder1.body.allowGravity = false;
    _ladder1.body.setImmovable(true);

    var _ladder2 = this.add
      .sprite(config.width / 2 + 290, config.height - 300, "ladder")
      .setScale(4, 4.3);
    this.ladder.add(_ladder2);
    _ladder2.body.allowGravity = false;
    _ladder2.body.setImmovable(true);

    var _ladder3 = this.add
      .sprite(config.width - 552, config.height - 300, "ladder")
      .setScale(4, 4.3);
    this.ladder.add(_ladder3);
    _ladder3.body.allowGravity = false;
    _ladder3.body.setImmovable(true);
  }

  collideBallPlatform(_ball, _plat) {
    if (_plat.body.touching.up) {
    } else if (_plat.body.touching.down) {
    } else if (_plat.body.touching.right) {
      _ball.direct *= -1;
    } else if (_plat.body.touching.left) {
      _ball.direct *= -1;
    }
  }

  createEnemy() {
    var enemyType = Phaser.Math.Between(1, 4);

    switch (enemyType) {
      case 1:
        var randomXPos = Phaser.Math.Between(100, config.width - 100);
        var _crab = new crabPrefab(this, randomXPos, 30);
        this.enemies.add(_crab);
        break;

      case 2:
        var randomYPos = Phaser.Math.Between(100, config.height - 300);
        var _bird1 = new bird1Prefab(this, 100, randomYPos);
        this.enemies.add(_bird1);
        break;

      case 3:
        var randomYPos = Phaser.Math.Between(100, config.height - 600);
        var _owl = new owlPrefab(this, 100, randomYPos);
        this.enemies.add(_owl);
        break;

      case 4:
        var randomXPos = Phaser.Math.Between(100, config.width - 100);
        var _conch = new conchPrefab(this, randomXPos, 30);
        this.enemies.add(_conch);
        break;
    }

    this.randomEnemySpawn = Phaser.Math.Between(20000, 30000);
    this.enemyTimer = this.time.addEvent({
      delay: this.randomEnemySpawn, //ms
      callback: this.createEnemy,
      callbackScope: this,
      repeat: 0,
    });
  }

  damagePlayer(_ball, _player) {
    if (this.invencible == false && !this.stopGravityBalls && _ball.spawn) {
      this.player1.playerHealth--;

      if (this.player1.playerHealth > 0) {
        //HUD perder vida
        gamePrefs.PLAYER1HEALTH = this.player1.playerHealth;
        this.scene.restart();
      } else {
        //gameOver
        this.gameOverflag = true;
        this.gameOver();
      }
    } else if (this.invencible == true) {
      this.dañoEscudo = true;
      this.shield.destroy();
      if (this.countDown2 <= 0) {
        this.countDown2 = 1;
        this.dañoEscudo = false;
        this.invencible = false;
      }
    }
  }

  pickPowerUp(_player, _powerUp) {
    switch (_powerUp.tipo) {
      case 1:
        //Doble harpon
        _player.harpoonNumberMax = 2;
        this.feedbackPowerUp = this.add
          .sprite(
            this.powerUp1FeedbackPosX,
            this.powerUp1FeedbackPosY,
            "powerUp1"
          )
          .setScale(4);
        break;
      case 2:
        //Invencibilidad
        if (this.invencible == false) {
          this.invencible = true;
          this.shield = this.add
            .sprite(this.player1.x, this.player1.y, "escudo")
            .setScale(4);
          this.shield.play("shield", true);
          this.shield.depth = 1;
          this.player1.depth = 2;
          this.floorD.depth = 3;
        }
        break;
      case 3:
        this.player1.doubleShoot = true;
        break;
      case 4:
        //Parar tiempo
        if (!this.stopGravityBalls) {
          this.stopGravityBalls = true;
          this.ballTimer = this.time.addEvent({
            delay: 8000, //ms
            callback: this.powerUpTimeFinished,
            callbackScope: this,
            repeat: 0,
          });
        }
        break;
      case 5:
        //PowerWire
        this.player1.FixShoot = true;
        break;
      case 6:
        //Dinamita
        this.Kaboom();
        break;
      case 7:
        gamePrefs.BALL_SPEED /= 2;

        this.ballpool.children.each(function (ball) {
          ball.body.setVelocityX(
            gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER * ball.direct
          );
          ball.body.setVelocityY(gamePrefs.GRAVITY);
        }, this);

        this.slowTimer = this.time.addEvent({
          delay: 8000, //ms
          callback: this.powerUpSlowTimeFinished,
          callbackScope: this,
          repeat: 0,
        });
        break;
    }
    _powerUp.destroy();
  }

  powerUpTimeFinished() {
    this.stopGravityBalls = false;
    this.ballpool.children.each(function (ball) {
      ball.body.allowGravity = true;
      ball.body.setVelocityX(
        gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER * ball.direct
      );
      ball.body.setVelocityY(gamePrefs.GRAVITY);
    }, this);
  }

  powerUpSlowTimeFinished() {
    gamePrefs.BALL_SPEED *= 2;

    this.ballpool.children.each(function (ball) {
      ball.body.setVelocityX(
        gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER * ball.direct
      );
      ball.body.setVelocityY(gamePrefs.GRAVITY);
    }, this);
  }

  Kaboom() {
    this.ballpool.getChildren().forEach(function (children) {
      this.margen = 0;
      if (children.scaleX > 1) {
        this.createBall(
          children.x + this.margen,
          children.y + this.margen,
          children.scaleX - 1,
          1
        );
        this.createBall(
          children.x + this.margen,
          children.y + this.margen,
          children.scaleX - 1,
          -1
        );
        this.margen = this.margen + 100;
        children.destroy();

        this.enemyTimer = this.time.addEvent({
          delay: 500, //ms
          callback: this.Kaboom,
          callbackScope: this,
          repeat: 0,
        });
        //this.Kaboom();
      } //si no no hace nada
    }, this);
  }

  createBall(positionX, positionY, scale, direct) {
    //Creamos una nueva pelota y la añadimos al grupo
    var _ball = new ballPrefab(
      this,
      positionX,
      positionY,
      "ball",
      direct
    ).setScale(scale, scale / 0.9);
    this.ballpool.add(_ball);

    //Modificamos su velocidad
    _ball.body.setCircle(
      _ball.width / 2,
      0,
      _ball.height / 2 - _ball.width / 2
    );
    _ball.body.setBounce(1, 1);
    _ball.body.setVelocityY(gamePrefs.GRAVITY);
    _ball.body.setVelocityX(
      gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER * direct
    );
  }

  hitBall(_harpoon, _ballCol) {
    this._hud.setScore(10);
    this.explosionSound = this.sound.add("explosionSound", {
      loop: false,
      volume: 0.3,
    });
    this.explosionSound.play();
    //Genera PowerUp
    var rnd = Phaser.Math.Between(1, 5);
    if (rnd == 1) {
      var tipo = Phaser.Math.Between(1, 7);
      this.createPowerUp(_ballCol.x, _ballCol.y, tipo);
    }

    if (_ballCol.scaleX > 1) {
      //Si no es la pelota mas pequeña genera 2 nuevas mas pequeñas
      if (this.stopGravityBalls) {
        this.createBall(_ballCol.x - 50, _ballCol.y, _ballCol.scaleX - 1, 1);
        this.createBall(_ballCol.x + 50, _ballCol.y, _ballCol.scaleX - 1, -1);
      } else {
        this.createBall(_ballCol.x, _ballCol.y, _ballCol.scaleX - 1, 1);
        this.createBall(_ballCol.x, _ballCol.y, _ballCol.scaleX - 1, -1);
      }
    }

    var _explosion = new explosionPrefab(
      this,
      _ballCol.x,
      _ballCol.y,
      "ballExplosion"
    );
    var _scoreOnScreen = new scoreOnScreenPrefab(this, _ballCol.x, _ballCol.y);
    //Destruimos harpon y pelota
    if (this.player1.harpoonNumber > 0) this.player1.harpoonNumber--;
    _harpoon.destroy();
    _ballCol.destroy();

    if (this.ballpool.getLength() == 0) {
      //Si es la ultima pelota destruida, ganas
      this.winScene();
    }
  }

  createPowerUp(_posX, _posY, _tipo) {
    //Creamos power up y añadimos a grupo
    var _powerUp = new powerUpPrefab(this, _posX, _posY, _tipo).setScale(3);
    this.powerUps.add(_powerUp);
    if (_tipo == 6) _powerUp.anims.play("dynamite");
    this.powerUpTimer = this.time.addEvent({
      delay: gamePrefs.POWERUP_DESTROY_TIMER, //ms
      callback: this.destroyPowerUp,
      args: [_powerUp],
      callbackScope: this,
      repeat: 0,
    });
  }

  destroyPowerUp(_powerUp) {
    var i = 0;
    this.tintTimer = this.time.addEvent({
      delay: 200,
      callback: () => {
        if (i % 2 == 0) _powerUp.tint = 0xffffff;
        else _powerUp.tint = 0x9b9b9b;

        i++;
        if (i >= 20) _powerUp.destroy();
      },
      callbackScope: this,

      repeat: 20,
    });
    //_powerUp.destroy();
  }

  createWalls() {
    //Creamos el suelo
    this.floorD = this.physics.add.sprite(
      config.width - 960,
      config.height - 185,
      "floor"
    );
    this.floorD.body.allowGravity = false;
    this.floorD.body.setImmovable(true);
    this.floorD.setDepth(1);
    this.floorU = this.physics.add.sprite(
      config.width - 960,
      config.height - 882,
      "floor"
    );
    this.floorU.body.allowGravity = false;
    this.floorU.body.setImmovable(true);

    //Creamos las paredes
    this.wall = this.physics.add.sprite(20, config.height - 543, "wall");
    this.wall.body.allowGravity = false;
    this.wall.body.setImmovable(true);
    this.wallR = this.physics.add.sprite(
      config.width - 20,
      config.height - 543,
      "wall"
    );
    this.wallR.body.allowGravity = false;
    this.wallR.body.setImmovable(true);
  }

  createPlatforms() {
    var _platform1 = this.add
      .sprite(200, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform1);
    _platform1.body.allowGravity = false;
    _platform1.body.setImmovable(true);

    var _platform2 = this.add
      .sprite(500, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform2);
    _platform2.body.allowGravity = false;
    _platform2.body.setImmovable(true);
    
    var _platform3 = this.add
      .sprite(800, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform3);
    _platform3.body.allowGravity = false;
    _platform3.body.setImmovable(true);
    
    var _platform4 = this.add
      .sprite(1100, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform4);
    _platform4.body.allowGravity = false;
    _platform4.body.setImmovable(true);

    var _platform5 = this.add
      .sprite(1400, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform5);
    _platform5.body.allowGravity = false;
    _platform5.body.setImmovable(true);

    var _platform6 = this.add
      .sprite(1700, config.height / 2-50, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform6);
    _platform6.body.allowGravity = false;
    _platform6.body.setImmovable(true);

    var _platform7 = this.add
      .sprite(350, config.height / 2-150, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform7);
    _platform7.body.allowGravity = false;
    _platform7.body.setImmovable(true);

    var _platform8 = this.add
      .sprite(650, config.height / 2-150, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform8);
    _platform8.body.allowGravity = false;
    _platform8.body.setImmovable(true);

    var _platform9 = this.add
      .sprite(950, config.height / 2-150, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform9);
    _platform9.body.allowGravity = false;
    _platform9.body.setImmovable(true);

    var _platform10 = this.add
      .sprite(1250, config.height / 2-150, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform10);
    _platform10.body.allowGravity = false;
    _platform10.body.setImmovable(true);

    var _platform11 = this.add
      .sprite(1550, config.height / 2-150, "normalPlatAPetita")
      .setScale(0.6);
    this.normalPlatforms.add(_platform11);
    _platform11.body.allowGravity = false;
    _platform11.body.setImmovable(true);
  }

  lifesHUD() {
    //Se van eliminando el indicador de vidas conforme se va perdiendo
    if (this.player1.playerHealth == 2) {
      this.live3.destroy();
    } else if (this.player1.playerHealth == 1) {
      this.live3.destroy();
      this.live2.destroy();
    } else if (this.player1.playerHealth == 0) {
      this.live1.destroy();
    }
  }

  update(time, delta) {
    if (this.stopGravityBalls == true) {
      this.ballpool.children.each(function (ball) {
        ball.body.allowGravity = false;
        ball.body.setVelocityX(0);
        ball.body.setVelocityY(0);
      }, this);
    }

    if (this.gameOverflag == false) {
      //TIMER
      if (this.countDown <= 0) {
        this.gameOverflag = true;
        this.gameOver();
      }
    }
    if (this.invencible == true && this.dañoEscudo == false) {
      this.shield.x = this.player1.x;
      this.shield.y = this.player1.y;
    }

    if (this.invencible == true && this.dañoEscudo == true) {
      this.timer2 += delta;

      if (this.timer2 > 1000) {
        this.resources2 += 1;
        this.timer2 -= 1000;
        this.countDown2 -= 1;

        if (this.countDown2 <= 0) {
          this.invencible = false;
          this.countDown2 = 1;
          this.dañoEscudo = false;
        }
      }
    }

    //Funcion que controla el HUD de las vidas
    this.lifesHUD();

    if (this.gameOverflag == true) {
      this.gameOver();
    }
    if (this.restartGameOver == true) {
      if (this.cursores.space.isDown) {
        gamePrefs.PLAYER1HEALTH = this.newLifes;
        this.scene.resume();
        this.scene.restart();
      }
    }
  }

  winScene() {
    gamePrefs.SCORE = this.score;
    gamePrefs.STAGE = this.stageNumber;
    gamePrefs.TIMER = this.countDown;
    this.scene.start("winScene");
  }

  gameOver() {
    this._hud.setGameOverText();
    this.player1.destroy();
    this.restartGameOver = true;
  }
}
