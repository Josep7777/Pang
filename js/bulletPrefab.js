class bulletPrefab extends Phaser.GameObjects.Sprite
{
        constructor(_scene,_posX,_posY,tag="doubleShoot"){

            super(_scene,_posX,_posY,tag).setScale(4);
            _scene.bullets.add(this);
            this.body.setVelocityY(gamePrefs.SPEED_BULLET);
            this.anims.play("doubleShoot", true);
            this.body.allowGravity = false;
            _scene.add.existing(this);



            _scene.physics.add.overlap(
                this,
                _scene.floorU,
                this.destroyBullet,
                null,
                this
              );
              
        }

destroyBullet(){

    this.destroy();
}

}