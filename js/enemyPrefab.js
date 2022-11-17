class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.direccion = 1;
        this.scene = _scene;
        this.body.setVelocityX(gamePrefs.ENEMY_SPEED*this.direccion);
        _scene.physics.add.overlap
        (
            this,
            _scene.hero,
            this.hit,
            null,
            this
        );
    }

    hit(_enemy,_hero)
    {
        if(_enemy.body.touching.up && _hero.body.touching.down)
        {
            this.destroy();
            _hero.body.setVelocityY(-gamePrefs.HERO_JUMP);       
        }else
        {
            _hero.hit();
            /*
            _hero.body.reset(65,100);
            this.scene.cameras.main.shake(500,0.05);
            this.scene.cameras.main.flash(500,255,0,0);
            */
        }

    }

}