import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

function createBillboard(text) {
  const billboard = new Object3D();
  const sprite = createSprite(text);
  sprite.position.set(0, 0.65, 0);
  billboard.add(sprite);
  return billboard;
}

function updateBillboard(billboard, camera) {
  billboard.quaternion.copy(camera.quaternion);
}

function createSprite(text) {
  const canvas = createCanvas(text);
  const texture = new Texture(canvas);
  texture.needsUpdate = true;

  const material = new SpriteMaterial({ map: texture });
  const sprite = new Sprite(material);
  return sprite;
}

function createCanvas(text) {
  const fontface = 'Arial';
  const fontsize = 24;
  const backgroundColor = 'rgba(50,75,75,0.5)';
  const textColor = 'rgba(255,255,255,0.75)';
  const borderColor = 'rgba(160,255,255,0.25)';
  const padding = 10;
  const width = 256;
  const height = 100;
  const contentWidth = width - (2 * padding);
  const contentHeight = height - (2 * padding);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  context.fillStyle = backgroundColor;
  context.strokeStyle = borderColor;
  context.lineWidth = 0;

  // Box
  context.fillRect(0, 0, width, height);

  // Text
  context.font = `Normal ${fontsize}px ${fontface}`;
  context.fillStyle = textColor;
  context.textBaseline = 'middle';
  const textPositionX = padding;
  const textPositionY = height / 2;
  context.fillText(text, textPositionX, textPositionY, contentWidth);

  return canvas;
}

export { createBillboard, updateBillboard };
