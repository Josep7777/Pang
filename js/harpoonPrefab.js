class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag)
    {
        super(_scene,_posX,_posY,_tag);
        _scene.add.existing(this);
            
        
    }
}