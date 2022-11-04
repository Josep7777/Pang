class pang extends Phaser.Scene {
  constructor() {
    super({ key: "pang" });
  }


  preload() {
    this.load.setPath("assets/img/");
    this.load.image('harpoon','Harpoon0.png');
    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
  }

  create() {
    this.loadAnimations();
    //this.loadPools();
    this.harpoonNumber=0;
    this.player1 = this.physics.add.sprite(config.width/2, config.height-250, 'player1').setScale(3).setFrame(4);
    //this.player1.play('idle');
    this.cursores = this.input.keyboard.createCursorKeys();

    this.cursores.space.on
       (
        'down',
        function()
        {
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

    /*this.physics.add.overlap
        (
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );*/
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

  /*createEnemy()
    {
        var _enemy = this.enemyPool.getFirst(false);  //Buscamos en el pool de enemigos si hay alguna reutilizable
        var posX = Phaser.Math.Between(16,config.width-16);
        var posY = -16;
        if(!_enemy)
        {//No hay
            console.log('Create Enemy');            
            _enemy = new enemyPrefab(this,posX,posY,'enemy');
            this.enemyPool.add(_enemy);
        }else
        {//Si hay
            console.log('Reset Enemy');
            _enemy.active = true;
            _enemy.body.reset(posX,posY);
            _enemy.health=2;
        }
        //Sea un enemigo nuevo o uno reutilizable, le damos velocidad
        _enemy.body.setVelocityY(gamePrefs.SPEED_ENEMY);

        var rnd = Phaser.Math.Between(2,6);
        _enemy.shootingTimer = this.time.addEvent
        ({
            delay:rnd*1000,
            callback:this.createEnemyBullet,
            args:[_enemy],
            callbackScope:this,
            repeat:-1
        });

    }*/

  createBullet() {
    if(this.harpoonNumber < 1) {
        this.player1.play('shoot');
        this.harpoonNumber++;
        console.log("Disparo");
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
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('player1', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: 1
        });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
  }

  update() {
    if (this.cursores.left.isDown) {
        this.player1.setFlipX(false);
        this.player1.x -=gamePrefs.CHARACTER_SPEED;
        this.player1.play('move', true);
    } else if (this.cursores.right.isDown) {
        this.player1.setFlipX(true);
        this.player1.x +=gamePrefs.CHARACTER_SPEED;
        this.player1.play('move', true);
    } else {
        this.player1.setFrame(4);
    }
  }
}
