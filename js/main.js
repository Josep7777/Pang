var gamePrefs=
{
    CHARACTER_SPEED: 250,
    GRAVITY: -45,
    BALL_SPEED: 10,
    BALL_DIRECTION: (1,1),
    PLAYER1HEALTH: 3,
    SCORE: 0,
    STAGE: 0,
    TIMER: 0
}

var config =
{
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    //scene:[menu,pang],
    scene:[pang,winScene],
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
            gravity:{y:90},
            debug:true
        }
    }
}

var juego = new Phaser.Game(config);