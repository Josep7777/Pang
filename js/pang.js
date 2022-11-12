class pang extends Phaser.Scene {
  constructor() {
    super({ key: "pang" });
  }

  preload() {
    //Pre cargamos los recursos
    this.load.setPath("assets/img/");
    //this.load.image('background','Background.png');
    this.load.image("harpoon", "Harpoon0.png");
    this.load.image("ball", "ball1.png");
    this.load.image("floor", "Floor2.png");
    this.load.image("wall", "Wall.png");
    this.load.image("lifes", "lifes.png");
    this.load.image("powerUp1", "PowerUpDoubleWire.png");
    this.load.image("powerUp2", "powerUpMolinillo.png");
    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
    this.load.spritesheet("escudo", "formaCumProtecion.png", {
      frameWidth: 37,
      frameHeight: 41,
    });
  }

  loadPools() {
    this.ballpool = this.physics.add.group();
    // this.bulletPool = this.physics.add.group();
    this.powerUps = this.physics.add.group();
  }

  create() {
    //Cargamos las animaciones que tendra el juego
    this.loadAnimations();

    //Cargamos las pools
    this.loadPools();

    this.createWalls(); // Funcion para crear suelo, techo y paredes

    //Creamos la pelota, le pasamos lax, la y, y la escala
    this.createBall(config.width - 1700, config.height - 700, 4, 1);

    //Añadimos al jugador con fisicas
    this.player1 = this.physics.add
      .sprite(config.width / 2, config.height - 250, "player1")
      .setScale(3)
      .setFrame(4);

    //Variables del jugador
    this.player1Health = gamePrefs.PLAYER1HEALTH;
    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1; //Numero maximo de harpones que puede haber en pantalla
    this.invencible = false;
    this.isShooting = false;
    this.seconds = 0;
    this.timer2 = 0;
    this.resources = 0;
    //POSICION X/Y DEL FEEDBACK DEL POWER UP
    this.powerUp1FeedbackPosX = 400;
    this.powerUp1FeedbackPosY = 865;

    //  this.powerUp2FeedbackPosX = 400;
    //  this.powerUp2FeedbackPosY = 865;

    //Datos del HUD
    this.levelName = "MT.FUJI";
    this.worldNumber = 1;
    this.stageNumber = 1;
    this.highScore = 100000;
    this.countDown = 99;
    this.timeBoard;

    this.score = 0;
    this.newLifes = 3;
    this.scoreBoard;

    this.gameOverflag = false;
    this.restartGameOver = false;

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
    this.loadText();

    //Creamos los cursores para input
    this.cursores = this.input.keyboard.createCursorKeys();

    //Cuando le das al espacio, el jugador dispara
    this.cursores.space.on(
      "down",
      function () {
        this.createBullet();
      },
      this
    );

    //Añadimos colisiones
    this.physics.add.collider(this.floorD, this.player1);
    this.physics.add.collider(this.floorD, this.powerUps);
    this.physics.add.collider(this.wall, this.player1);
    this.physics.add.collider(this.wallR, this.player1);

    this.physics.add.overlap(
      this.ballpool,
      this.player1,
      this.damagePlayer1,
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

    this.physics.add.overlap(
      this.ballpool,
      this.floorD,
      this.bounce,
      null,
      this
    );

    this.physics.add.overlap(
      this.ballpool,
      this.floorU,
      this.bounce,
      null,
      this
    );
    this.physics.add.overlap(
      this.ballpool,
      this.wall,
      this.bounceP,
      null,
      this
    );
    this.physics.add.overlap(
      this.ballpool,
      this.wallR,
      this.bounceP,
      null,
      this
    );

  }

  damagePlayer1(_ball, _player) {
    if (this.invencible == false) {
      this.player1Health--;

      if (this.player1Health > 0) {
        //HUD perder vida
        gamePrefs.PLAYER1HEALTH = this.player1Health;
        this.scene.restart();
      } else {
        //gameOver
        this.gameOverflag = true;
        this.player1GameOver.setVisible(true);
        this.gameOver();
      }
    } else if (this.invencible == true) {
      /////////////////PONER AQUI COSAS DE TIMER PORQUE TE MATAN IMPORTANTE!!!!!!!!!!
      this.invencible = false;
      this.shield.x = 1000;
    }
  }

  pickPowerUp(_nave, _powerUp) {
    if (_powerUp.tipo == 1) {
      //Doble harpon
      this.harpoonNumberMax = 2;
      this.feedbackPowerUp = this.add
        .sprite(
          this.powerUp1FeedbackPosX,
          this.powerUp1FeedbackPosY,
          "powerUp1"
        )
        .setScale(4);
    } else if (_powerUp.tipo == 2) {
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
    }
    _powerUp.destroy();
  }

  createBall(positionX, positionY, scale, direct) {
    //Creamos una nueva pelota y la añadimos al grupo
    var _ball = new ballPrefab(
      this,
      positionX,
      positionY,
      "ball",
      direct
    ).setScale(scale);
    this.ballpool.add(_ball);

    //Modificamos su velocidad
    _ball.body.setVelocityY(gamePrefs.GRAVITY);
    _ball.body.setVelocityX(gamePrefs.BALL_SPEED * 20 * direct);
  }

  bounce(_ball, _floorD) {
    _floorD.body.setVelocityY(-(gamePrefs.GRAVITY * (-2.5 - _floorD.scale))); //por alguna razon floor es la pelota
    _floorD.body.setVelocityX(
      gamePrefs.BALL_SPEED * (20 - _floorD.scale) * _floorD.direct
    );
  }

  bounceP(_ball, _wall) {
    _wall.direct = _wall.direct * -1;
    _wall.body.setVelocityX(
      gamePrefs.BALL_SPEED * (20 + _wall.scale) * _wall.direct
    ); //NOVA

    //_wall.body.setVelocityY(gamePrefs.GRAVITY * (-10 +_wall.scale)); //por alguna razon floor es la pelota
    //  _wall.body.setVelocityX(0);
  }

  createBullet() { //Crea el harpon cuando se presiona espacio
    if (this.harpoonNumber < this.harpoonNumberMax) {
      this.player1.play("shoot", false);
      this.isShooting = true;

      //Cuando la animacion de disparo acabe cambia el flag para volver al frame default

      this.player1.once("animationcomplete", () => {
        this.isShooting = false;
      });

      this.harpoonNumber++;

      var harpoon = this.physics.add
        .image(this.player1.x, this.player1.y, "harpoon")
        .setScale(3);
      harpoon.scaleY = 0;

      this.tweens.add({
        //Crea una animacion para alargar el harpon
        targets: harpoon,
        y: 200,
        scaleY: 5,
        duration: 2000,
      });

      this.physics.add.overlap(
        harpoon,
        this.ballpool,
        this.hitBall,
        null,
        this
      );

      this.physics.add.overlap(
        harpoon,
        this.floorU,
        this.destroyHarpoon,
        null,
        this
      );
    }
  }

  destroyHarpoon(_harpoon, _floor) { //Destruye al harpon al tocar el techo
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
  }

  hitBall(_harpoon, _ballCol) {
    this.score += 10;

    //Genera PowerUp
    var rnd = Phaser.Math.Between(1, 5);
    if (rnd == 1) {
      var tipo = Phaser.Math.Between(1, 2);
      this.createPowerUp(_ballCol.x, _ballCol.y, tipo);
    }

    if (_ballCol.scale > 1) { //Si no es la pelota mas pequeña genera 2 nuevas mas pequeñas
      this.createBall(_ballCol.x, _ballCol.y, _ballCol.scale - 1, 1);
      this.createBall(_ballCol.x, _ballCol.y, _ballCol.scale - 1, -1);
    }

    //Destruimos harpon y pelota
    if (this.harpoonNumber > 0) this.harpoonNumber--;
    _harpoon.destroy();
    _ballCol.destroy();

    if (this.ballpool.getLength() == 0) { //Si es la ultima pelota destruida, ganas
      this.winScene();
    }
  }

  createPowerUp(_posX, _posY, _tipo) { //Creamos power up y añadimos a grupo
    var _powerUp = new powerUpPrefab(this, _posX, _posY, _tipo).setScale(3);
    this.powerUps.add(_powerUp);
  }

  loadText() {
    //PLAYERS
    this.add
      .text(250, 750, "PLAYER-1", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);

    this.add
      .text(1550, 750, "PLAYER-2", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //NOMBRE DEL MUNDO ACTUAL
    this.add
      .text(1000, 750, this.levelName, {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //NUMERO DE MUNDO Y NIVEL
    this.add
      .text(1000, 830, this.worldNumber + "-" + this.stageNumber + " STAGE", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //HIGH SCORE
    this.add
      .text(1000, 870, "HI: " + this.highScore, {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //INSERT COIN
    this.add
      .text(1550, 830, "INSERT COIN", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //SCORE
    this.scoreBoard = this.add
      .text(400, 800, this.score, {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);
    //TIMER
    this.timeBoard = this.add
      .text(1600, 100, "TIME:0" + this.countDown, {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(4);

    this.player1GameOver = this.add
      .text(270, 830, "GAME OVER!", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(2);

    this.gameOverText = this.add
      .text(config.width / 2, config.height / 2 - 100, "GAME OVER", {
        fontFamily: "Public Pixel",
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
      })
      .setOrigin(0.5)
      .setScale(4);

    this.player1GameOver.setVisible(false);
    this.gameOverText.setVisible(false);
  }

  updateText() {
    //SCORE
    this.scoreBoard.setText(this.score);
    //this.timer = this.timer - 0.014;
    this.timeBoard.setText("TIME:0" + Math.round(this.countDown));
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

  loadAnimations() {
    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("player1", { start: 4, end: 5 }),
      frameRate: 10,
      repeat: 0,
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
  }

  lifesHUD() {
    //Se van eliminando el indicador de vidas conforme se va perdiendo
    if (this.player1Health == 2) {
      this.live3.destroy();
    } else if (this.player1Health == 1) {
      this.live3.destroy();
      this.live2.destroy();
    } else if (this.player1Health == 0) {
      this.live1.destroy();
    }
  }

  winScene() {
    gamePrefs.SCORE = this.score;
    gamePrefs.STAGE = this.stageNumber;
    gamePrefs.TIMER = this.countDown;
    this.scene.start("winScene");
  }

  gameOver() {
    this.gameOverText.setVisible(true);
    //this.scene.pause('pang');
    this.player1.destroy();
    this.restartGameOver = true;
  }

  update(time,delta) {
    if (this.gameOverflag == false) {
      if (this.cursores.left.isDown) {
        if (!this.isShooting) {
          this.player1.setFlipX(false);
          this.player1.body.setVelocityX(-gamePrefs.CHARACTER_SPEED);
          this.player1.play("move", true);
        }
      } else if (this.cursores.right.isDown) {
        if (!this.isShooting) {
          this.player1.setFlipX(true);
          this.player1.body.setVelocityX(gamePrefs.CHARACTER_SPEED);
          this.player1.play("move", true);
        }
      } else {
        this.player1.body.setVelocityX(0);
        if (!this.isShooting) this.player1.setFrame(4);
      }
      
      //TIMER
      this.timer2 += delta;
      while (this.timer2 > 1000) {
        this.resources += 1;
        this.timer2 -= 1000;
        this.countDown -= 1;
    }
    }
    if (this.invencible == true) {
      this.shield.x = this.player1.x;
      this.shield.y = this.player1.y;
    }

    //Textos que cambian segun avanza la partida
    //time = Math.round(time * 0.001);


    
    this.updateText();
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
}
