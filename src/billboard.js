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
  const headerFontSize = 24;
  const infoFontSize = 20;
  const backgroundColor = 'rgba(50,75,75,0.5)';
  const headerTextColor = 'rgba(255,255,255,0.75)';
  const infoTextColor = 'rgba(255,255,255,0.60)';
  const padding = 10;
  const boxWidth = 256; // Must be a power of 2.
  // Removes some height from the bottom of the box to make the text look more centered.
  const heightReduction = 0.1 * headerFontSize;
  const headerLineHeight = 1.4 * headerFontSize;
  const infoLineHeight = 1.4 * infoFontSize;

  // Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = boxWidth;
  canvas.height = boxWidth;
  const context = canvas.getContext('2d');

  // Calculate properties and wrap text
  const contentWidth = boxWidth - (2 * padding);
  const headerLines = wrapText(context, text, contentWidth);
  const infoLines = wrapText(context, subtext, contentWidth);

  const spacing = 10;

  const totalLineHeight = (infoLineHeight * infoLines.length) + (headerLineHeight * headerLines.length);
  const contentHeight = (totalLineHeight + spacing) - heightReduction;
  const boxHeight = contentHeight + (2 * padding);
  const yOffset = canvas.height - boxHeight;

  // Render box.
  context.fillStyle = backgroundColor;
  context.fillRect(0, yOffset, boxWidth, boxHeight);

  // Render text.
  context.textBaseline = 'top';
  context.font = `Normal ${headerFontSize}px ${fontFace}`;
  context.fillStyle = headerTextColor;

  headerLines.forEach((line, i) => {
    const lineWidth = context.measureText(line).width;
    const lineX = padding + ((contentWidth - lineWidth) / 2);
    const lineY = padding + (i * headerLineHeight) + yOffset;
    context.fillText(line, lineX, lineY, contentWidth);
  });

  const headerHeight = headerLines.length * headerLineHeight;
  const infoTextStart = spacing + headerHeight;

  context.font = `Normal ${infoFontSize}px ${fontFace}`;
  context.fillStyle = infoTextColor;

  infoLines.forEach((line, i) => {
    const lineWidth = context.measureText(line).width;
    const lineX = padding + ((contentWidth - lineWidth) / 2);
    const lineY = infoTextStart + padding + (i * infoLineHeight) + yOffset;
    context.fillText(line, lineX, lineY, contentWidth);
  });

  return new Texture(canvas);
}

function wrapText(context, text, maxWidth) {
  const words = text.split(' ');
  if (words.length <= 1) {
    return [text];
  }

  const lines = [];
  let line = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const word = words[i];
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
  return lines;
}
