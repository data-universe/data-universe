import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

export default class Popup extends Object3D {
  constructor(text) {
    super();

    this.sprite = createSprite(text);
    this.initPosY = -2;
    this.sprite.position.set(0, this.initPosY, 0);

    this.posY = this.initPosY;
    this.upPosY = -1;
    this.timer = 0;
    this.selected = false;
    this.isUp = false;
    this.isMovingUp = true;
    this.timer = 0;
    this.timeLimit = 80;
    this.add(this.sprite);
  }

  update(selector) {
    // TODO: Rewrite this animation using tweens.

    if (!this.selected && selector.selectEvent && selector.selected) {
      this.selected = true;
    }
    else if (this.selected && !this.isUp && this.isMovingUp && this.posY <= this.upPosY) {
      this.posY += 0.03;
      this.sprite.position.set(0, this.posY, 0);
    }
    else if (this.selected && !this.isUp && this.isMovingUp) {
      this.isUp = true;
      this.isMovingUp = false;
    }
    else if (this.selected && this.isUp && this.timer < this.timeLimit) {
      this.timer += 1;
    }
    else if (this.selected && this.isUp) {
      this.isUp = false;
    }
    else if (this.selected && !this.isUp && !this.isMovingUp && this.posY > this.initPosY) {
      this.posY -= 0.03;
      this.sprite.position.set(0, this.posY, 0);
    }
    else if (this.selected) {
      this.selected = false;
      this.timer = 0;
      this.posY = this.initPosY;
      this.isUp = false;
      this.isMovingUp = true;
      this.sprite.position.set(0, this.posY, 0);
    }
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
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  context.font = 'Normal 12px Arial';
  context.textAlign = 'center';
  context.fillStyle = 'rgba(245,245,245,0.75)';
  context.fillText(text, 128, 128);

  return new Texture(canvas);
}
