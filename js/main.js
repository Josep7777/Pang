var gamePrefs=
{
    CHARACTER_SPEED: 250,
    GRAVITY: -9.8,
    BALL_SPEED: 10,
    BALL_DIRECTION: (1,1)
}

var config =
{
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
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
            gravity:{y:9.8},
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);