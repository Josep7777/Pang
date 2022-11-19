class crabPrefab extends enemyPrefab
{
    constructor(_scene,_positionX,_positionY,_spriteTag='crab')
    {
        super(_scene,_positionX,_positionY,_spriteTag);     
    }

    preUpdate(time,delta)
    {
        this.anims.play("crabWalking", true);
        if(this.body.blocked.right || this.body.blocked.left)
        {
            this.direccion *=-1;
            this.body.setVelocityX(gamePrefs.CRAB_SPEED*this.direccion);
            this.flipX = !this.flipX;
        }
        super.preUpdate(time,delta);
    }
}