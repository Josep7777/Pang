class winScene extends Phaser.Scene{
	constructor()
	{
		super({key: "winScene"});
	}

    preload(){
        this.load.setPath("assets/img/");
        this.load.image("winImage","winImage1.png");
    }

    create(){
        this.score = gamePrefs.SCORE;
        this.timerBonus = gamePrefs.TIMER * 100;
        this.stageNumber = gamePrefs.STAGE;
        console.log(this.score);
        this.add.sprite(config.width/2, config.height - 500, "winImage").setScale(1.5);
            //SCORE
    this.add.text
    (config.width/2, config.height - 250,this.stageNumber + "STAGE",{
            fontFamily: 'Public Pixel',
            fill: '#FFFFFF',
            stroke:'#FFFFFF',
        }
    ).setOrigin(.5).setScale(2);

    this.add.text
    (config.width/2, config.height - 150,"TIME BONUS    " + this.timerBonus + "PTS",{
            fontFamily: 'Public Pixel',
            fill: '#FFFFFF',
            stroke:'#FFFFFF',
        }
    ).setOrigin(.5).setScale(2);

    this.add.text
    (config.width/2, config.height - 80,"NEXT EXTEND   " + this.timerBonus + "PTS",{
            fontFamily: 'Public Pixel',
            fill: '#FFFFFF',
            stroke:'#FFFFFF',
        }
    ).setOrigin(.5).setScale(2);
    }

    update(){
        
    }
}