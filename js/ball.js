class ball extends Phaser.Physics.Arcade.Sprite {
  constructor(_scene, _posX, _posY,_tag,_direct) {
    super(_scene, _posX, _posY,_tag,_direct).setScale(0.5);

    _scene.add.existing(this);
    this.direct = _direct;
  }
}
