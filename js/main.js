var gamePrefs=
{
    CHARACTER_SPEED: 250,
    CHARACTER_SPEEDLADDER:5,
    GRAVITY: -45,//REBOTE
    GRAVITYCHARACTER:-300,
    BALL_SPEED: 10,
    ORIGINAL_BALL_SPEED: 10,
    BALL_DIRECTION: (1,1),
    PLAYER1HEALTH: 3,
    SCORE: 0,
    STAGE: 0,
    TIMER: 0,
    TIMER2: 0,
    VELOCITY_MAKER: 20,
    VELOCITY_MAKER2: -2.2,
    CRAB_SPEED: 200,
    BIRD1_SPEED: 300,
    OWL_SPEED: 300,
    OWL_CHANGE_Y: 70,
    CONCH_SPEED: 200,
    CONCH_FALLING_SPEED: 400,
    CURRENT_WORLD: 1,
    POWERUP_DESTROY_TIMER: 5000,
    TIMER_LEVELSELECTOR: 10,
    SPEED_BULLET:-400,
    WORLD1_NAME:"MT.FUJI",
    WORLD2_NAME:"MT.KEIRIN",
    WORLD3_NAME:"ESMERALD\nTEMPLE",
    STAGES_WORLD1:"STAGE   1-3",
    STAGES_WORLD2:"STAGE   4-6",
    STAGES_WORLD3:"STAGE   7-9"
}

var config =
{
    type: Phaser.AUTO,
    width: 1920,
    height: 900,
    //scene:[menu,pang],
    scene:[mainMenu,levelSelector,level1_1,level1_2,level1_3,level1_4,level1_5,level1_6,level1_7,level1_8,winScene,worldCompleted],
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