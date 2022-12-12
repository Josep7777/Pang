class powerUpPrefab extends Phaser.GameObjects.Sprite {
  constructor(scene, positionX, positionY, _tipo) {
    super(scene, positionX, positionY, "powerUp" + _tipo);
    scene.add.existing(this);
    this.tipo = _tipo;
  }
}