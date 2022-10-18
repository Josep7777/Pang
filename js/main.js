var gamePrefs=
{

}

var config =
{
    type: Phaser.AUTO,
    width: 128,
    height: 256,
    scene:[gameState], //array con los niveles/pantallas/escenas (unity)
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