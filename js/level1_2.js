class level1_2 extends Phaser.Scene {
  constructor() {
    super({ key: "level1_2" });
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
    this.load.image("powerUp5", "powerUpGanchoFijo.png");
    this.load.spritesheet("powerUp6", "PowerUpDinamita.png", {
      frameWidth: 22.6,
      frameHeight: 16,
    });
    this.load.image("destructPlat", "BrokenPlatform.png");
    this.load.image("background2","background1-2.png")

    this.load.spritesheet('crab','crab.png',
        {frameWidth:38.4,frameHeight:30});

    this.load.spritesheet('bird','birdEnemy.png',
    {frameWidth:34,frameHeight:24});

    this.load.spritesheet('enemyDeath','EnemiesDeath.png',
        {frameWidth:33,frameHeight:32});

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
      frames: this.anims.generateFrameNumbers("bird", { start: 0, end: 5}),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "bird1Hit",
      frames: this.anims.generateFrameNumbers("bird", { start: 6, end: 7}),
      frameRate: 5,
      repeat: 4,
    });

    this.anims.create({
      key: "enemyDeath",
      frames: this.anims.generateFrameNumbers("enemyDeath", { start: 0, end: 4}),
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
      key: "conchDown",
      frames: this.anims.generateFrameNumbers("conch", { start: 0, end: 3}),
      frameRate: 5,
      repeat: -1,
    });
  }

  loadPools() {
    this.ballpool = this.physics.add.group();
    this.powerUps = this.physics.add.group();
    this.destructivePlatforms = this.physics.add.group();
    this.enemies = this.add.group();
    this.ladder = this.physics.add.group();
  }

  create() {
    this.sound.stopAll();
    this.backgroundMusic = this.sound.add('mtFujiTheme', { loop: true });
    this.backgroundMusic.play();
    //Cargamos las animaciones que tendra el juego
    this.loadAnimations();
    this.add.sprite(config.width/2, config.height/2-100, "background2");
    //Cargamos las pools
    this.loadPools();

    this.createWalls(); // Funcion para crear suelo, techo y paredes
    this.createPlatforms();
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

    this.countDown2 = 1;

    this.stopGravityBalls = false;

    //Datos del HUD
    //this.hud = new hudPrefab(this, "hud");
    this.levelName = "MT.FUJI";
    this.worldNumber = 1;
    this.stageNumber = 2;
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

    //Creamos los cursores para input
    this.cursores = this.input.keyboard.createCursorKeys();

    //Añadimos colisiones
    this.physics.add.collider(this.floorD, this.player1);
    this.physics.add.collider(this.floorD, this.powerUps);
    this.physics.add.collider(this.floorD, this.enemies);
    this.physics.add.collider(this.wall, this.player1);
    this.physics.add.collider(this.wallR, this.player1);

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
    if (this.invencible == false && !this.stopGravityBalls) {
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
        //Objetos que dan puntuacion
        this.score += 500;
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
    }
    _powerUp.destroy();
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
        ); //MUY PROBABLEMENTE NO SE HAGA BIEN PORQUE SE CREAN EN EL MISMO SPOT
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

  createBall(positionX, positionY, scale, direct) {
    //Creamos una nueva pelota y la añadimos al grupo
    var _ball = new ballPrefab(
      this,
      positionX,
      positionY,
      "ball",
      direct
    ).setScale(scale, scale/0.9);
    this.ballpool.add(_ball);

    //Modificamos su velocidad
    _ball.body.setCircle(_ball.width/2, 0, _ball.height/2 - _ball.width/2);
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
      var tipo = Phaser.Math.Between(1, 6);
      this.createPowerUp(_ballCol.x, _ballCol.y, tipo);
    }

    if (_ballCol.scaleX > 1) {
      //Si no es la pelota mas pequeña genera 2 nuevas mas pequeñas
      if (this.stopGravityBalls) {
        this.createBall(_ballCol.x - 50, _ballCol.y, _ballCol.scaleX - 1, 1);
        this.createBall(_ballCol.x + 50, _ballCol.y, _ballCol.scaleX - 1, -1);
      }else{
        this.createBall(_ballCol.x, _ballCol.y, _ballCol.scaleX - 1, 1);
        this.createBall(_ballCol.x, _ballCol.y, _ballCol.scaleX - 1, -1);
      }
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

    this.powerUpTimer = this.time.addEvent({
      delay: gamePrefs.POWERUP_DESTROY_TIMER, //ms
      callback: this.destroyPowerUp,
      args: [_powerUp],
      callbackScope: this,
      repeat: 0,
    });
  }


  destroyPowerUp(_powerUp){
    var i=0;
    this.tintTimer = this.time.addEvent({
      delay: 200,
      callback: ()=>{ 
        if(i % 2 == 0)
        _powerUp.tint = 0xffffff; 
        else
        _powerUp.tint = 0x9b9b9b;

        i++;
        if(i >= 20)
        _powerUp.destroy();
      },
      callbackScope: this,

      repeat: 20 
    });
    //_powerUp.destroy(); 
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

  createPlatforms(){
    var _platform1 = this.add.sprite(
      config.width/2-60,
      config.height/2-100,
      "destructPlat"
    ).setScale(0.6);

    this.destructivePlatforms.add(_platform1);
    _platform1.body.allowGravity = false;
    _platform1.body.setImmovable(true);

    var _platform2 = this.add.sprite(
      config.width/2+60,
      config.height/2-100,
      "destructPlat"
    ).setScale(0.6);
    this.destructivePlatforms.add(_platform2);
    _platform2.body.allowGravity = false;
    _platform2.body.setImmovable(true);
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

    if (this.stopGravityBalls == true) {
      this.ballpool.children.each(function (ball) {
        ball.body.allowGravity = false;
        ball.body.setVelocityX(0);
        ball.body.setVelocityY(0);
      }, this);
    }

    if (this.gameOverflag == false) {
      //TIMER
      this.timer += delta;

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
