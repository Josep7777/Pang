var gamePrefs=
{
    CHARACTER_SPEED: 250,
    GRAVITY: -45,
    BALL_SPEED: 10,
    BALL_DIRECTION: (1,1),
    PLAYER1HEALTH: 3,
    SCORE: 0,
    STAGE: 0,
    TIMER: 0,
    TIMER2: 0,
    VELOCITY_MAKER: 20,
    VELOCITY_MAKER2: -2.5,
    CRAB_SPEED: 100
}

var config =
{
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    //scene:[menu,pang],
    scene:[levelSelector,level1_1,winScene],
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
            debug:false
        }
    }
}

var juego = new Phaser.Game(config);