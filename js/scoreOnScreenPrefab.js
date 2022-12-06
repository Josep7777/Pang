class scoreOnScreenPrefab extends Phaser.GameObjects.GameObject
{
    constructor(_scene,_positionX,_positionY,)
    {
        super(_scene,_positionX,_positionY);
          this.texto="100pts!";
        //_scene.add.text(_positionX,_positionY,this.texto);
        this.text = _scene.add.text(_positionX, _positionY, this.texto, { font: "50px publicPixel", fill: "#ffffff", align: "center" });
        this.text.setDepth(10);//FALTA PONER FUENTUES BIEN
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