import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

export function createBillboard(text, subtext, height) {
  const billboard = new Object3D();
  const sprite = createSprite(text, subtext);
  const y = height + 0.5;
  sprite.position.set(0, y, 0);
  billboard.add(sprite);
  billboard.isBillboard = true;
  return billboard;
}

export function updateBillboard(billboard, camera) {
  billboard.quaternion.copy(camera.quaternion);
}

function createSprite(text, subtext) {
  const texture = createTexture(text, subtext);
  texture.needsUpdate = true;

  const material = new SpriteMaterial({ map: texture, fog: true });
  const sprite = new Sprite(material);
  return sprite;
}

function createTexture(text, subtext) {
  // These constants can be tweaked to change the styling.
  const fontFace = 'Arial';
  const fontSize = 24;
  const backgroundColor = 'rgba(50,75,75,0.5)';
  const textColor = 'rgba(255,255,255,0.75)';
  const padding = 10;
  const boxWidth = 256; // Must be a power of 2.
  const lineHeight = 1.4 * fontSize;
  // Removes some height from the bottom of the box to make the text look more centered.
  const heightReduction = 0.1 * fontSize;

  // Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = boxWidth;
  canvas.height = boxWidth;
  const context = canvas.getContext('2d');
  context.font = `Normal ${fontSize}px ${fontFace}`;

  // Calculate properties and wrap text
  const contentWidth = boxWidth - (2 * padding);
  const lines = wrapText(context, text, subtext, contentWidth);
  const contentHeight = (lines.length * lineHeight) - heightReduction;
  const boxHeight = contentHeight + (2 * padding);
  const yOffset = canvas.height - boxHeight;

  // Render box.
  context.fillStyle = backgroundColor;
  context.fillRect(0, yOffset, boxWidth, boxHeight);

  // Render text.
  context.fillStyle = textColor;
  context.textBaseline = 'top';
  lines.forEach((line, i) => {
    const lineWidth = context.measureText(line).width;
    const lineX = padding + ((contentWidth - lineWidth) / 2);
    const lineY = padding + (i * lineHeight) + yOffset;
    context.fillText(line, lineX, lineY, contentWidth);
  });

  return new Texture(canvas);
}

function wrapText(context, text, subtext, maxWidth) {
  const words = text.split(' ');
  if (words.length <= 1) {
    return [text];
  }
  const lines = [];
  let line = words[0];

  wordsToLines(words);

  function wordsToLines(w) {
    for (let i = 1; i < w.length; i += 1) {
      const word = w[i];
      const testLine = `${line} ${word}`;
      const testWidth = context.measureText(testLine).width;
      if (testWidth >= maxWidth) {
        lines.push(line);
        line = word;
      }
      else {
        line = testLine;
      }
    }
    lines.push(line);
  }

  const subwords = subtext.split(' ');
  lines.push('------------------');
  if (subwords.length <= 1) {
    lines.push(subtext);
  }
  else {
    line = subwords[0];
    wordsToLines(subwords);
  }

  return lines;
}
