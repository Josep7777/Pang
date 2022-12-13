class mainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "mainMenu" });
  }
  preload() {
    /***********************Sprites/Imagenes**********************/
    //this.load.setPath("assets/img/");

    //Character
    this.load.setPath("assets/img/character");
    this.load.spritesheet("player1", "Character.png", {
      frameWidth: 31,
      frameHeight: 32,
    });
    this.load.image("harpoon", "Harpoon0.png");

    //Platforms
    this.load.setPath("assets/img/platforms");
    this.load.image("floor", "Floor2.png");
    this.load.image("wall", "Wall.png");
    this.load.image("normalPlat", "PlataformaRoja1.png");
    this.load.image("destructPlat", "BrokenPlatform.png");
    this.load.image("normalPlatV", "YellowPlatform.png");
    this.load.image("destructPlatV", "PlataformaAzulVertical.png");
    this.load.image("normalPlatAPetita", "PlataformaAmarillaPequena.png");
    this.load.image("destructPlatA", "PlataformaAmarillaRompible.png");
    this.load.image("normalBlueVertical", "PlataformaAzulClaroH.png");
    this.load.image("normalBlueHorizontal", "PlataformaAzulClaroV.png");
    this.load.image("ladder", "escalera.png");

    //Levels
    this.load.setPath("assets/img/levels");
    this.load.image("background", "Background.png");
    this.load.image("background2", "background1-2.png");
    this.load.image("background3", "background1-3.png");
    this.load.image("background4", "background1-4.png");
    this.load.image("background5", "background1-5.png");
    this.load.image("background6", "background1-6.png");
    this.load.image("background7", "background1-7.png");
    this.load.image("background8", "background1-8.png");

    //HUD
    this.load.setPath("assets/img/hud");
    this.load.image("lifes", "lifes.png");
    this.load.image("markYellow", "markYellow.png");
    this.load.image("markOrange", "markOrange.png");
    this.load.image("map", "map.png");
    this.load.image("logo", "pangLogo.gif");
    this.load.image("winImage", "winImage1.png");
    this.load.image("plane", "plane.png");

    //PowerUps
    this.load.setPath("assets/img/powerUps");
    this.load.image("powerUp1", "PowerUpDoubleWire.png");
    this.load.image("powerUp2", "powerUpEscudo.png");
    this.load.image("powerUp4", "PowerUpStopTime.png");
    this.load.image("powerUp5", "powerUpGanchoFijo.png");
    this.load.spritesheet("powerUp6", "PowerUpDinamita.png", {
      frameWidth: 22.67,
      frameHeight: 16,
    });
    this.load.image("powerUp7", "PowerUpSlowTime.png");
    this.load.image("powerUp8", "powerUpDoubleShoot.png");
    this.load.spritesheet("doubleShoot", "doubleShoot.png", {
      frameWidth: 19,
      frameHeight: 9,
    });

    //Particles
    this.load.setPath("assets/img/particles");
    this.load.spritesheet("ballExplosion", "BallExplosion.png", {
      frameWidth: 62,
      frameHeight: 52,
    });

    this.load.spritesheet("enemyDeath", "EnemiesDeath.png", {
      frameWidth: 33,
      frameHeight: 32,
    });

    this.load.spritesheet("escudo", "Shield.png", {
      frameWidth: 37,
      frameHeight: 41,
    });

    //Comidas
    this.load.setPath("assets/img/food");
    this.load.image("food1", "berenjena.png");
    this.load.image("food2", "calabaza.png");
    this.load.image("food3", "cereza.png");
    this.load.image("food4", "chirimoya.png");
    this.load.image("food5", "donut.png");
    this.load.image("food6", "hamburguesa.png");
    this.load.image("food7", "judia.png");
    this.load.image("food8", "limon.png");
    this.load.image("food9", "maiz.png");
    this.load.image("food10", "manzana.png");
    this.load.image("food11", "melon.png");
    this.load.image("food12", "naranja.png");
    this.load.image("food13", "pastel.png");
    this.load.image("food14", "patatas.png");
    this.load.image("food15", "pepino.png");
    this.load.image("food16", "perrito.png");
    this.load.image("food17", "pimiento.png");
    this.load.image("food18", "piña.png");
    this.load.image("food19", "platano.png");
    this.load.image("food20", "pollo.png");
    this.load.image("food21", "salchicha.png");
    this.load.image("food22", "sandia.png");
    this.load.image("food23", "seta.png");
    this.load.image("food24", "sushi.png");
    this.load.image("food25", "tomate.png");
    this.load.image("food26", "uva.png");
    this.load.image("food27", "zanahoria.png");
    this.load.image("powerUp3", "fresa.png");

    //Enemigos
    this.load.setPath("assets/img/enemies");
    this.load.spritesheet("crab", "crab.png", {
      frameWidth: 38.4,
      frameHeight: 30,
    });
    this.load.spritesheet("bird", "birdEnemy.png", {
      frameWidth: 34,
      frameHeight: 24,
    });
    this.load.spritesheet("owl", "owl.png", {
      frameWidth: 38.36,
      frameHeight: 33,
    });
    this.load.spritesheet("conch", "conch.png", {
      frameWidth: 19.25,
      frameHeight: 26,
    });

    //Balls
    this.load.setPath("assets/img/balls");
    this.load.image("ball", "ball1.png");

    /************************Sonidos***********************/
    this.load.setPath("assets/music/");

    //Musicas
    this.load.audio("mtFujiTheme", "mtFuji.mp3");
    this.load.audio("mtKeirin", "mtKeirin.mp3");
    this.load.audio("EmeraldTemple", "EmeraldTemple.mp3");
    //SFX
    this.load.audio("explosionSound", "explosion.wav");
    this.load.audio("LaserShootSound", "snd_shoot.mp3");
    this.load.audio("ShootSound", "sfx_shoot.wav");
    this.load.setPath("assets/sfx/");
    this.load.audio("airplaneSound", "plane.ogg");

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
