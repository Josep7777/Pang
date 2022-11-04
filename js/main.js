var gamePrefs=
{
    CHARACTER_SPEED: 5
}

var config =
{
    type: Phaser.AUTO,
    width: 1920,
    height: 1040,
    //scene:[menu,pang],
    scene:[pang],
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            //gravity:{y:0},
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);