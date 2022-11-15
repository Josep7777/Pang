class hudPrefab extends Phaser.GameObjects.GameObject
{
    constructor(_scene,_tag)
    {
        super(_scene,_tag);
        _scene.add.existing(this);        
    }

    update(){
        console.log("hola");
    }
}