class pang extends Phaser.Scene {
  constructor() {
    super({ key: "pang" });
  }

  preload() { //Pre cargamos los recursos
    this.load.setPath("assets/img/");
    //this.load.image('background','Background.png');
    this.load.image("harpoon", "Harpoon0.png");
    this.load.image("ball", "ball1.png");
    this.load.image("floor", "Floor.png");
    this.load.image("pu_double_wire", "PowerUpDoubleWire.png");
    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
  }

  loadPools() {
    this.ballpool = this.physics.add.group();
    // this.bulletPool = this.physics.add.group();
    this.powerUps = this.physics.add.group();
  }

  create() {
    //this.background = this.add.sprite(0,0,'background');

    //Cargamos las animaciones que tendra el juego
    this.loadAnimations();
    this.isShooting = false;

    //Cargamos las pools
    this.loadPools();

    //Creamos la pelota, le pasamos lax, la y, y la escala
    this.createBall(config.width - 1800, config.height - 900, 4);
    //this.ball1 = this.physics.add.sprite(config.width/2, config.height-250, 'ball').setScale(3);
    this.powerUpWire = this.physics.add.sprite(config.width/2, config.height/2,'pu_double_wire').setScale(3);
    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1;
    //Añadimos al jugador con fisicas
    this.player1 = this.physics.add
      .sprite(config.width / 2, config.height - 250, "player1")
      .setScale(3)
      .setFrame(4);
    
    this.player1Health = 3;

    //Creamos los cursores para input
    this.cursores = this.input.keyboard.createCursorKeys();

    //Creamos el suelo
    this.floor = this.physics.add.sprite(550, config.height - 190, "floor");
    this.floor.body.allowGravity = false;
    this.floor.body.setImmovable(true);

    //Añadimos colisiones
    this.physics.add.collider(this.floor, this.player1);
    this.physics.add.collider(this.floor, this.ballpool);
    //this.floor2 = this.add.sprite(1400,890,'floor');
    //this.floor = this.physics.add.sprite(180,100,'floor');

    //Cuando le das al espacio, dispara
    this.cursores.space.on(
      "down",
      function () {
        this.createBullet();
      },
      this
    );
    /*
       this.shootingTimer = this.time.addEvent(
        {
            delay: 1000,
            callback: this.createBullet,
            callbackScope: this,
            repeat: -1
        });
        */

    this.physics.add.overlap
      (
        this.ballpool,
        this.player1,
        this.damagePlayer1,
        null,
        this
      );
  }

  damagePlayer1(_ball, _player){
    this.player1Health--;
    if(this.player1Health > 0) {
      //HUD perder vida
      //this.scene.restart();
    } else {
      //gameOver
    }

  }

  pickPowerUp(_nave, _powerUp) {
    _powerUp.setActive(false);
    _powerUp.x = -100;
    var _delay = 500;
    this.shootingTimer = this.time.addEvent({
      delay: _delay,
      callback: this.createBullet,
      callbackScope: this,
      repeat: 10000 / _delay,
    });
    this.manualShootingTimer = this.time.addEvent({
      delay: 10000,
      callback: this.manualShooting,
      callbackScope: this,
      repeat: 0,
    });

    this.cursores.space.off("up", this.createBullet(), this);
  }

  manualShooting() {
    this.cursores.space.on(
      "up",
      function () {
        this.createBullet();
      },
      this
    );
  }

  /*killEnemy(_bullet,_enemy)
    {
        _bullet.setActive(false);
        _bullet.x = -100;
        _enemy.health--;
        if(_enemy.health>0)
        {
            //invulnerabilidad por X segundos
        }else
        {
            
            this.time.removeEvent(_enemy.shootingTimer);
            var rnd = Phaser.Math.Between(1,1); //20% de posibilidades de generar un powerUp
            if(rnd==1)
            {
                var tipo = Phaser.Math.Between(1,1);
                this.createPowerUp(_enemy.body.x,_enemy.body.y,tipo);
            }
            _enemy.setActive(false);
            _enemy.x = -100;
        }
    }*/

  createBall(positionX, positionY, scale) {
    /*this._ball = this.ballpool.getFirst(false);
    if (!this._ball) {
      //No hay
      console.log("Create Enemy");
      var _ball = new ball(this, posX, posY, "ball").setScale(scale);
      //var _ball = new Ball(this, Phaser.Math.Between(0+10,config.width-10), -1);
      this.ballpool.add(_ball);
      // _Ball.body.setVelocityY(-100);
      // _Ball.body.setVelocityY(100);
      //   this.enemyPool.add(_enemy);
    } else {
      console.log("vendo opel corsa2");
      _ball.active = true;
      _ball.body.reset(this, Phaser.Math.Between(0 + 10, config.width - 10));
    }*/
    //Creamos una nueva pelota y la añadimos al grupo
    var _ball = new ball(this, positionX, positionY, "ball").setScale(scale);
    this.ballpool.add(_ball);

    //Modificamos su velocidad
    _ball.body.setVelocityY(gamePrefs.GRAVITY * -10);
    _ball.body.setVelocityX(gamePrefs.BALL_SPEED * 10);
  }

  createBullet() {
    if (this.harpoonNumber < this.harpoonNumberMax) {
      this.player1.play("shoot", false);
      this.isShooting = true;

      //Cuando la animacion de disparo acabe cambia el flag para volver al frame default

      this.player1.once('animationcomplete', () => {
        console.log('animationcomplete');
        this.isShooting = false;
      })

      this.harpoonNumber++;
      var harpoon = this.physics.add.image(this.player1.x, this.player1.y, 'harpoon').setScale(3);
      harpoon.scaleY = 0;

      this.tweens.add({ //Crea una animacion para alargar el harpon
        targets: harpoon,
        y: 200,
        scaleY: 5,
        duration: 1000,
        onComplete: function (tweens, targets) {
          this.harpoonNumber--;
          harpoon.destroy();
        }.bind(this)
      })

      this.physics.add.overlap
        (
          harpoon,
          this.ballpool,
          this.hitBall,
          null,
          this
        );
    }
  }

  hitBall(_harpoon, _ballCol) {
    if (_ballCol.scale > 1) {
      this.createBall(_ballCol.x + 30 * _ballCol.scale * 2, _ballCol.y, _ballCol.scale - 1)
      this.createBall(_ballCol.x - 30 * _ballCol.scale * 2, _ballCol.y, _ballCol.scale - 1)
    };

    _harpoon.destroy();
    _ballCol.destroy();
  }

  /*var _bullet = this.bulletPool.getFirst(false);
  if (!_bullet) {
    console.log("create bullet");
    _bullet = new bulletPrefab(this, this.nave.x, this.nave.y);
    this.bulletPool.add(_bullet);
  } else {
    console.log("reset bullet");
    _bullet.active = true;
    _bullet.body.reset(this.nave.x, this.nave.y);
  }
  //Le doy velocidad
  _bullet.body.setVelocityY(gamePrefs.SPEED_BULLET);*/

  killEnemy(ball2) {
    console.log("AAAAAAAAAAAAAA");
    var posXAux = ball2.x;
    var posYAux = ball2.y;
    var scaleAux = scale / 2;
    ball2.setActive(false);
    ball2.x = -1000;

    createBall(posXAux, posYAux, scaleAux);
  }

  createPowerUp(_posX, _posY, _tipo) {
    var _powerUp = this.powerUps.getFirst(false);

    if (!_powerUp) {
      //crea un powerUp nueva
      console.log("create powerUp tipo:" + _tipo);
      _powerUp = new powerUpPrefab(this, _posX, _posY, _tipo);
      this.powerUps.add(_powerUp);
      _powerUp.anims.play("standPowerUp" + _tipo);
    } else {
      //reset
      _powerUp.setTexture("powerUp" + _tipo, 0);

      _powerUp.active = true;
      _powerUp.body.reset(_posX, _posY);
    }
    //Damos velocidad
    _powerUp.tipo = _tipo;
    _powerUp.body.setVelocityY(gamePrefs.POWER_UP_SPEED);
  }

  loadAnimations() {
    this.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers("player1", { start: 4, end: 5 }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });
  }

  update() {
    if (this.cursores.left.isDown) {
      this.player1.setFlipX(false);
      this.player1.body.setVelocityX(-gamePrefs.CHARACTER_SPEED);
      this.player1.play("move", true);
    } else if (this.cursores.right.isDown) {
      this.player1.setFlipX(true);
      this.player1.body.setVelocityX(gamePrefs.CHARACTER_SPEED);
      this.player1.play("move", true);
    } else {
      this.player1.body.setVelocityX(0);
      if (!this.isShooting) this.player1.setFrame(4);
    }
  }
}
