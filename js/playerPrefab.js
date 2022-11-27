class playerPrefab extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY, _tag, _direct) {
    super(_scene, _posX, _posY, _tag).setScale(3);

    _scene.add.existing(this);
    _scene.physics.world.enable(this);

    this.playerHealth = gamePrefs.PLAYER1HEALTH;
    this.FixShoot =false;
    this.escaleraColider = false;
    this.harpoonNumber = 0; //Variable que se usara para determinar cuantos disparos consecutivos puede hacer el jugador
    this.harpoonNumberMax = 1; //Numero maximo de harpones que puede haber en pantalla
    this.isShooting = false;
    this.canShoot=true;
    this.cursores = _scene.input.keyboard.createCursorKeys();

    this.body.setSize(this.width-7, this.height, true);
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

  colisionLader(_ladder,_player){
    this.escaleraColider = true;
  }


  createBullet(_sceneParam) {
    //Crea el harpon cuando se presiona espacio
  

    if(this.FixShoot==true){
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
  
       this.animation = _sceneParam.tweens.add({
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
          this.countdownFix,
          //this.destroyHarpoon,
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
    }else{
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

  countdownFix(_harpoon,_floor){              //DUBTE PER EL RICHARD
    this.animation.stop();
    _harpoon.setImmovable(true);
    _harpoon.body.setAllowGravity(false);
    this.TimerFix = this.scene.time.addEvent({
      delay: 2000, //ms
      callback: this.destroyHarpoon,
      args: [_harpoon,_floor],
      callbackScope: this,
      repeat: 0,
    })
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
    if(this.FixShoot==true) this.FixShoot=false;
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
      if (!this.isShooting && !this.cursores.up.isDown) {
        this.anims.stop();
        this.setFrame(4);
      }
    }
    if(this.escaleraColider){

      if (this.cursores.up.isDown) {
        this.y-=gamePrefs.CHARACTER_SPEEDLADDER;
        this.anims.play("playerladder", true);  
      

      }/*else{
        this.anims.stop();
        this.setFrame(4);
      }*/
     // if(this.y>){ //IMPLEMENTAR PODER QUEDARTE ENCIMA DE LA ESCALERA
     // }

    }else{//ESTAS ENCIMA DE LA ESCALERA O ESTAS CAYENDO
      this.body.setVelocityY(-gamePrefs.GRAVITYCHARACTER);
   
    }


    this.escaleraColider=false;

    super.preUpdate(time, delta);
  }
}
