import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

function createBillboard() {
  const billboard = new Object3D();
  const sprite = createSprite();
  sprite.position.set(0, 0.75, 0);
  billboard.add(sprite);
  return billboard;
}

function updateBillboard(billboard, camera) {
  billboard.quaternion.copy(camera.quaternion);
}

function createSprite() {
  const canvas = createCanvas();
  const texture = new Texture(canvas);
  texture.needsUpdate = true;

  const material = new SpriteMaterial({ map: texture });
  const sprite = new Sprite(material);
  return sprite;
}

function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  context.fillStyle = '#f00';
  context.fillRect(0, 0, 128, 64);
  return canvas;
}

export { createBillboard, updateBillboard };
