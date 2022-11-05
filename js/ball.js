class ball extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene,_posX,_posY){

        super(_scene,_posX,_posY,'ball').setScale(.5);
        
        _scene.add.existing(this);
      //  this.health =1;
       
    }
    }