import { Object3D } from 'three/core/Object3D';
import { Texture } from 'three/textures/Texture';
import { SpriteMaterial } from 'three/materials/SpriteMaterial';
import { Sprite } from 'three/objects/Sprite';

export default class Billboard extends Object3D {
  constructor(text, subtext, height) {
    super();

    const sprite = createSprite(text, subtext);
    const y = height + 0.5;
    sprite.position.set(0, y, 0);
    this.add(sprite);
    this.isBillboard = true;
  }

  update(camera) {
    this.quaternion.copy(camera.quaternion);
  }
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
  const spacing = 18;
  const boxWidth = 256; // Must be a power of 2.
  // Removes some height from the bottom of the box to make the text look more centered.
  const heightReduction = 0.1 * headerFontSize;

  // Calculate the height of a line
  const headerLineHeight = 1.4 * headerFontSize;
  const infoLineHeight = 1.4 * infoFontSize;

  // Setup Canvas
  const canvas = document.createElement('canvas');
  canvas.width = boxWidth;
  canvas.height = boxWidth;
  const context = canvas.getContext('2d');

  // Calculate properties and wrap text
  const contentWidth = boxWidth - (2 * padding);
  context.font = `Normal ${headerFontSize}px ${fontFace}`;
  const headerLines = wrapText(context, text, contentWidth);
  context.font = `Normal ${infoFontSize}px ${fontFace}`;
  const infoLines = wrapText(context, subtext, contentWidth);

  // Calculate the heights of each segment
  const headerTotalLineHeight = (headerLines.length * headerLineHeight);
  const infoHeight = (infoLines.length * infoLineHeight);
  const totalLineHeight = headerTotalLineHeight + infoHeight;

  // Calculate the start of info text segment
  const infoTextStart = spacing + (headerTotalLineHeight + padding);

  const contentHeight = (totalLineHeight + spacing) - heightReduction;
  const boxHeight = contentHeight + (2 * padding);
  const yOffset = canvas.height - boxHeight;

  // Render box.
  context.fillStyle = backgroundColor;
  context.fillRect(0, yOffset, boxWidth, boxHeight);

  // Render header text.
  context.textBaseline = 'top';
  context.font = `Normal ${headerFontSize}px ${fontFace}`;
  context.fillStyle = headerTextColor;

  headerLines.forEach((line, i) => {
    const lineWidth = context.measureText(line).width;
    const lineX = padding + ((contentWidth - lineWidth) / 2);
    const lineY = padding + (i * headerLineHeight) + yOffset;
    context.fillText(line, lineX, lineY, contentWidth);
  });

  // Draws line divider
  context.beginPath();
  context.moveTo(0, ((headerTotalLineHeight + padding) + yOffset) + (spacing / 2));
  context.lineTo(boxWidth, ((headerTotalLineHeight + padding) + yOffset) + (spacing / 2));
  context.strokeStyle = 'rgba(50,75,75,0.8)';
  context.stroke();

  //  Render info text
  context.font = `Normal ${infoFontSize}px ${fontFace}`;
  context.fillStyle = infoTextColor;

  infoLines.forEach((line, i) => {
    const lineWidth = context.measureText(line).width;
    const lineX = padding + ((contentWidth - lineWidth) / 2);
    const lineY = infoTextStart + (i * infoLineHeight) + yOffset;
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
