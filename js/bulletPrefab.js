class bulletPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_tag='bullet')
    {
        super(_scene,_posX,_posY,_tag);
        /*
        if(_tag==undefined)
            super(_scene,_posX,_posY,'bullet');
        else
            super(_scene,_posX,_posY,_tag);
        */
            _scene.add.existing(this);
            
        
    }
    
   preUpdate()
   {
        if(this.y <=0 || this.y >=config.height)
            this.active=false;
   }



}


//this.add.sprite(posX,posY,tag); 