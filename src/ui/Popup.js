import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

export default class Popup extends Object3D {
  constructor(text) {
    super();

    const sprite = createSprite(text);
    sprite.position.set(0, 0, 0);
    this.add(sprite);
  }

  update() {

  }
}

function createSprite(text) {
  const texture = createTexture(text);
  texture.needsUpdate = true;

  const material = new SpriteMaterial({ map: texture, fog: true });
  const sprite = new Sprite(material);
  return sprite;
}

function createTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 100;
  const context = canvas.getContext('2d');

  context.font = 'Normal 40px Arial';
  context.textAlign = 'center';
  context.fillStyle = 'rgba(245,245,245,0.75)';
  context.fillText('Fubar', 250, 100);

  return new Texture(canvas);
}
