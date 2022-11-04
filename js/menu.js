class menu extends Phaser.Scene{
	constructor()
	{
		super({key: "menu"});
	}
	preload()
	{
		this.load.setPath('assets/img/');
        this.load.image('bg1','background_back.png');
        this.load.image('bg2','background_frontal.png');
        this.load.spritesheet('nave','naveAnim.png',{frameWidth:16,frameHeight:24});
        this.load.image('btn_play','btn.png');
    }
	create()
	{
		this.bg1 = this.add.tileSprite
		(0,0,config.width,config.height,'bg1').setOrigin(0);
		this.bg2 = this.add.tileSprite
		(0,0,config.width,config.height,'bg2').setOrigin(0);
		this.nave = this.physics.add.sprite
		(config.width/2,config.height/2,'nave').setOrigin(.5).setScale(1);

		this.anims.create
        ({
            key:'idle',
            frames:this.anims.generateFrameNumbers('nave',{start:0,end:1}),
            frameRate:10,
            repeat:-1
        });
		
        this.nave.anims.play('idle');

		this.titulo = this.add.text
		(
			config.width/2, 
			config.height/2 -75,
			'Shooter 2D',
			{
				fontFamily: 'Arial Black',
				fill: '#43d637',
				stroke:'#FFFFFF',
				strokeThickness:4
			}
		).setOrigin(.5);


		this.boton = this.add.image
		(config.width/2, 
		config.height/2 +75,
		'btn_play')
		.setScale(.25)
		.setInteractive({useHandCursor:true})
		.on
		(
			'pointerdown',
			this.iniciaJuego,
			this
		);
	}

	iniciaJuego()
	{
		console.log('gogogo');
		this.boton.destroy();
		this.add.tween
		({
			targets:this.titulo,
			duration:2000,
			alpha:0
		});
		this.add.tween
		({
			targets:this.nave,
			duration:3000,
			y:config.height-20,
			onComplete:this.cambiaEscena,
			onCompleteScope:this
		});
		
	}

	cambiaEscena()
	{
		this.scene.start('gameState');
	}

	update()
	{
		this.bg1.tilePositionY -=.25;
        this.bg2.tilePositionY -=1;
	}
}