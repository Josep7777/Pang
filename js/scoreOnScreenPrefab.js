class scoreOnScreenPrefab extends Phaser.GameObjects.GameObject
{
    constructor(_scene,_positionX,_positionY,)
    {
        super(_scene,_positionX,_positionY);
          this.texto="100pts!";
        this.text = _scene.add.bitmapText(_positionX, _positionY, "publicPixelWhite", this.texto, 15);
        this.text.setDepth(10);
        this.timeOnScreen = _scene.time.addEvent({
            delay: 1000, //ms
            callback: this.destroyText,
            callbackScope: this,
            repeat: 0,
          });
    }

      destroyText(){
        this.text.destroy();
        this.destroy();
      }
}