class level1_1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1_1" });
  }

  preload() {
    //Pre cargamos los recursos
    this.load.setPath("assets/img/");
    this.load.image("harpoon", "Harpoon0.png");
    this.load.image("ball", "ball1.png");
    this.load.image("floor", "Floor2.png");
    this.load.image("wall", "Wall.png");
    this.load.image("lifes", "lifes.png");
    this.load.image("powerUp1", "PowerUpDoubleWire.png");
    this.load.image("powerUp2", "powerUpEscudo.png");
    this.load.image("powerUp3", "fresa.png");
    this.load.image("powerUp4", "slowTime.png");
    this.load.image("background","Background.png")

    this.load.spritesheet('crab','crab.png',
        {frameWidth:38.4,frameHeight:30});

    this.load.spritesheet('bird1','bird1.png',
        {frameWidth:36,frameHeight:30});

    this.load.spritesheet('owl','owl.png',
        {frameWidth:38.36,frameHeight:33});

    this.load.spritesheet('conch','conch.png',
        {frameWidth:19.25,frameHeight:26});

    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
    this.load.spritesheet("escudo", "Shield.png", {
      frameWidth: 37,
      frameHeight: 41,
    });
    //Cargamos sonidos
    this.load.setPath("assets/music/");
    this.load.audio('mtFujiTheme', 'mtFuji.mp3');
    //FONTS
    this.load.setPath('assets/fonts/');
    this.load.bitmapFont('publicPixel','publicPixel.png','publicPixel.xml');
    this.load.bitmapFont('publicPixelWhite','publicPixelWhite.png','publicPixelWhite.xml');
    this.load.bitmapFont('publicPixelYellow','publicPixelYellow.png','publicPixelYellow.xml');
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
    this.anims.create({
      key: "crabWalking",
      frames: this.anims.generateFrameNumbers("crab", { start: 6, end: 9}),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "crabDeath",
      frames: this.anims.generateFrameNumbers("crab", { start: 0, end: 5}),
      frameRate: 7,
      repeat: 0,
    });
    this.anims.create({
      key: "bird1Fly",
      frames: this.anims.generateFrameNumbers("bird1", { start: 0, end: 5}),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "bird1Death",
      frames: this.anims.generateFrameNumbers("bird1", { start: 13, end: 14}),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "owlFly",
      frames: this.anims.generateFrameNumbers("owl", { start: 0, end: 5}),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "owlHit",
      frames: this.anims.generateFrameNumbers("owl", { start: 12, end: 13}),
      frameRate: 5,
      repeat: 2,
    });

    this.anims.create({
      key: "owlDeath",
      frames: this.anims.generateFrameNumbers("bird1", { start: 13, end: 14}),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "conchDown",
      frames: this.anims.generateFrameNumbers("conch", { start: 0, end: 3}),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "conchDeath",
      frames: this.anims.generateFrameNumbers("bird1", { start: 13, end: 14}),
      frameRate: 5,
      repeat: 0,
    });
  }

  loadPools() {
    this.ballpool = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.enemies = this.add.group();
  }

  create() {
    this.sound.stopAll();
    this.backgroundMusic = this.sound.add('mtFujiTheme', { loop: true });
    this.backgroundMusic.play();
    //Cargamos las animaciones que tendra el juego
    this.loadAnimations();
    this.add.sprite(config.width/2, config.height/2-82, "background");
    
    //Cargamos las pools
    this.loadPools();

    this.createWalls(); // Funcion para crear suelo, techo y paredes

    //Creamos la pelota, le pasamos la x, la y, y la escala
    this.createBall(config.width - 1700, config.height - 700, 4, 1);

    //Añadimos al jugador con fisicas
    this.player1 = new playerPrefab(this, config.width / 2, config.height - 250, "player1");

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
    this.timerText = 0;
    this.flashText = false;
    this.countDown2 = 1;

    //Datos del HUD
    //this.hud = new hudPrefab(this, "hud");
    this.levelName = "MT.FUJI";
    this.worldNumber = 1;
    this.stageNumber = 1;
    this.highScore = 100000;
    this.timer = 0;
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

    this.stopGravityBalls = false;
    //Creamos los cursores para input
    this.cursores = this.input.keyboard.createCursorKeys();

    //Añadimos colisiones
    this.physics.add.collider(this.floorD, this.player1);
    this.physics.add.collider(this.floorD, this.powerUps);
    this.physics.add.collider(this.floorD, this.enemies);
    this.physics.add.collider(this.wall, this.player1);
    this.physics.add.collider(this.wallR, this.player1);
    //this.physics.add.collider(this.wallR, this.enemies);
    //this.physics.add.collider(this.wall, this.enemies);
    /*var collider = this.physics.add.collider(this.wall, this.enemies, null, function ()
    {
        this.physics.world.removeCollider(collider);
    }, this);*/

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
    this.enemyTimer = this.time.addEvent
        (
            {
                delay: this.randomEnemySpawn, //ms
                callback:this.createEnemy,
                callbackScope:this,
                repeat: 0
            }
        );
  }

  createEnemy(){
    var enemyType = Phaser.Math.Between(1, 4);

    switch(enemyType){
      case 1:
        var randomXPos = Phaser.Math.Between(100, config.width-100);
        var _crab = new crabPrefab(this,randomXPos,30);
        this.enemies.add(_crab);
        break;

      case 2:
        var randomYPos = Phaser.Math.Between(100, config.height-300);
        var _bird1 = new bird1Prefab(this,100,randomYPos);
        this.enemies.add(_bird1);
        break;
      
      case 3:
          var randomYPos = Phaser.Math.Between(100, config.height-600);
          var _owl = new owlPrefab(this,100,randomYPos);
          this.enemies.add(_owl);
          break;

      case 4:
          var randomXPos = Phaser.Math.Between(100, config.width-100);
          var _conch = new conchPrefab(this,randomXPos,30);
          this.enemies.add(_conch);
          break;
    }

    this.randomEnemySpawn = Phaser.Math.Between(20000, 30000);
    this.enemyTimer = this.time.addEvent
        (
            {
                delay: this.randomEnemySpawn, //ms
                callback:this.createEnemy,
                callbackScope:this,
                repeat: 0
            }
        );

  }

  damagePlayer(_ball, _player) {
    if (this.invencible == false) {
      this.player1.playerHealth--;

      if (this.player1.playerHealth > 0) {
        //HUD perder vida
        gamePrefs.PLAYER1HEALTH = this.player1.playerHealth;
        this.scene.restart();
      } else {
        //gameOver
        this.gameOverflag = true;
        this.player1GameOver.setVisible(true);
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
    if (_powerUp.tipo == 1) {
      //Doble harpon
      _player.harpoonNumberMax = 2;
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
    } else if (_powerUp.tipo == 3) {
      //Objetos que dan puntuacion
      this.score += 500;
    }else if(_powerUp.tipo == 4){

      this.stopGravityBalls = true;
      this.ballTimer = this.time.addEvent
      (
          {
              delay: 8000, //ms
              callback:this.powerUpTimeFinished,
              callbackScope:this,
              repeat: 0
          }
      );

    }
    _powerUp.destroy();
  }

  powerUpTimeFinished(){
    console.log("devuelta velocidad")
    this.stopGravityBalls = false;
    this.ballpool.setVelocityY(gamePrefs.GRAVITY);
    this.ballpool.setVelocityX(gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER
    );
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
    _ball.body.setVelocityX(
      gamePrefs.BALL_SPEED * gamePrefs.VELOCITY_MAKER * direct
    );
  }

  hitBall(_harpoon, _ballCol) {
    this.score += 10;

    //Genera PowerUp
    var rnd = Phaser.Math.Between(1, 5);
    if (rnd == 1) {
      var tipo = Phaser.Math.Between(1, 4);
      this.createPowerUp(_ballCol.x, _ballCol.y, tipo);
    }

    if (_ballCol.scale > 1) {
      //Si no es la pelota mas pequeña genera 2 nuevas mas pequeñas
      this.createBall(_ballCol.x, _ballCol.y, _ballCol.scale - 1, 1);
      this.createBall(_ballCol.x, _ballCol.y, _ballCol.scale - 1, -1);
    }

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
  }

  loadText() {
    //PLAYERS
      this.add.bitmapText(130, 730, 'publicPixelWhite', "PLAYER-1",30);
      this.add.bitmapText(1430, 730, 'publicPixelWhite', "PLAYER-2",30);

    //NOMBRE DEL MUNDO ACTUAL
      this.add.bitmapText(890, 730, 'publicPixelWhite', this.levelName,30);
    //NUMERO DE MUNDO Y NIVEL
      this.add.bitmapText(860, 810, 'publicPixelWhite', this.worldNumber + "-" + this.stageNumber + " STAGE",30);
    //HIGH SCORE
    this.add.bitmapText(840, 860, 'publicPixelWhite', "HI: " + this.highScore,30);

    //INSERT COIN
    this.insertCoin = this.add.bitmapText(1390, 810, 'publicPixelWhite', "INSERT COIN",30);

    //SCORE
    this.scoreBoard = this.add.bitmapText(389, 777, 'publicPixelWhite', this.score,30);
      
    //TIMER
    this.timeBoard = this.scoreBoard = this.add.bitmapText(1350, 50, 'publicPixelWhite', "TIME:0" + this.countDown,65);

    //GAME OVER UI
    this.player1GameOver = this.add.bitmapText(120, 830, 'publicPixelWhite', "GAME OVER!",30);
    this.gameOverText = this.add.bitmapText(config.width / 2 - 250, config.height / 2 - 100, 'publicPixelWhite', "GAME OVER",65);

    this.player1GameOver.setVisible(false);
    this.gameOverText.setVisible(false);
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

  updateText() {
    //SCORE
    this.scoreBoard.setText(this.score);
    this.timeBoard.setText("TIME:0" + Math.round(this.countDown));
  }

  update(time, delta) {
    if(this.stopGravityBalls == true){
      this.ballpool.setVelocityX(0)
      this.ballpool.setVelocityY(0)
    }
    if (this.gameOverflag == false) {
      //TIMER
      this.timer += delta;
      this.timerText += delta;

      if (this.timer > 1000) {
        this.resources += 1;
        this.timer -= 1000;
        this.countDown -= 1;
      }
      if (this.countDown <= 0) {
        this.gameOverflag = true;
        this.player1GameOver.setVisible(true);
        this.gameOver();
      }
      if(this.timerText > 500){
        if(this.flashText){
          this.insertCoin.setVisible(true);
          this.flashText = false;
        }
        else if(!this.flashText){
          this.insertCoin.setVisible(false);
          this.flashText = true;
        }
        this.timerText = 0;
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

  winScene() {
    gamePrefs.SCORE = this.score;
    gamePrefs.STAGE = this.stageNumber;
    gamePrefs.TIMER = this.countDown;
    this.scene.start("winScene");
  }

  gameOver() {
    this.gameOverText.setVisible(true);
    this.player1.destroy();
    this.restartGameOver = true;
  }
}
