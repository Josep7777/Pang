class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "mainMenu" });
  }
  preload() {
    /***********************Sprites/Imagenes**********************/
    this.load.setPath("assets/img/");
    
    //Jugador
    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
    this.load.image("harpoon", "Harpoon0.png");

    //Plataformas
    this.load.image("floor", "Floor2.png");
    this.load.image("wall", "Wall.png");
    this.load.image("normalPlat", "PlataformaRoja1.png");
    this.load.image("destructPlat", "BrokenPlatform.png");
    this.load.image("normalPlatV", "YellowPlatform.png");
    this.load.image("ladder", "escalera.png");

    //Fondos
    this.load.image("winImage","winImage1.png");
    this.load.image("map","map.png");
    this.load.image("background", "Background.png");
    this.load.image("background2", "background1-2.png");
    this.load.image("background3", "background1-3.png");
    this.load.image("background4", "background1-4.png");
    this.load.image("background6", "background1-6.png");
    this.load.image("logo", "pangLogo.gif");

    //PowerUps
    this.load.image("powerUp1", "PowerUpDoubleWire.png");
    this.load.image("powerUp2", "powerUpEscudo.png");
    this.load.spritesheet("escudo", "Shield.png", {
      frameWidth: 37,
      frameHeight: 41,
    });
    this.load.image("powerUp3", "fresa.png");
    this.load.image("powerUp4", "PowerUpStopTime.png");
    this.load.image("powerUp5", "powerUpGanchoFijo.png");
    this.load.spritesheet("powerUp6", "PowerUpDinamita.png", {
      frameWidth: 22.67,
      frameHeight: 16,
    });
    this.load.image("powerUp7", "PowerUpSlowTime.png");
    
    //Enemigos
    this.load.image("ball", "ball1.png");
    this.load.spritesheet("ballExplosion", "BallExplosion.png", {
      frameWidth: 62,
      frameHeight: 52,
    });
    this.load.spritesheet("crab", "crab.png", {
      frameWidth: 38.4,
      frameHeight: 30,
    });
    this.load.spritesheet("bird", "birdEnemy.png", {
      frameWidth: 34,
      frameHeight: 24,
    });
    this.load.spritesheet("enemyDeath", "EnemiesDeath.png", {
      frameWidth: 33,
      frameHeight: 32,
    });
    this.load.spritesheet("owl", "owl.png", {
      frameWidth: 38.36,
      frameHeight: 33,
    });
    this.load.spritesheet("conch", "conch.png", {
      frameWidth: 19.25,
      frameHeight: 26,
    });

    //UI
    this.load.image("lifes", "lifes.png");
    


    /************************Sonidos***********************/
    this.load.setPath("assets/music/");

    //Musicas
    this.load.audio("mtFujiTheme", "mtFuji.mp3");

    //SFX


    /**************************Fuentes****************************/
    this.load.setPath("assets/fonts/");
    this.load.bitmapFont("publicPixel", "publicPixel.png", "publicPixel.xml");
    this.load.bitmapFont(
      "publicPixelWhite",
      "publicPixelWhite.png",
      "publicPixelWhite.xml"
    );
    this.load.bitmapFont(
      "publicPixelYellow",
      "publicPixelYellow.png",
      "publicPixelYellow.xml"
    );
  }


  create() {
    this.cursores = this.input.keyboard.createCursorKeys();
    this.flashText = false;
    this.timerText = 0;
    this.add
      .sprite(config.width / 2, config.height / 2 - 100, "logo")
      .setScale(3.5);
    this.add.bitmapText(
      config.width / 2 - 450,
      660,
      "publicPixelWhite",
      "©MITCHEL  1989",
      60
    );
    this.insertCoin = this.add.bitmapText(
      config.width / 2 - 390,
      780,
      "publicPixelWhite",
      "INSERT COIN",
      60
    );
  }

  update(time, delta) {
    if (this.cursores.space.isDown) {
      this.scene.start("levelSelector");
    }
    this.timerText += delta;
    if (this.timerText > 500) {
      if (this.flashText) {
        this.insertCoin.setVisible(true);
        this.flashText = false;
      } else if (!this.flashText) {
        this.insertCoin.setVisible(false);
        this.flashText = true;
      }
      this.timerText = 0;
    }
  }
}
