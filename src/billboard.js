import { CSS3DObject } from 'three_examples/renderers/CSS3DRenderer';

function createBillboard(text) {
  const element = document.createElement('div');
  element.className = 'billboard';
  element.style.display = 'block'; // 'none'; should be the default
  element.textContent = text;

  const billboard = new CSS3DObject(element);
  const scale = 0.01;
  billboard.scale.set(scale, scale, scale);

  return billboard;
}

export { createBillboard };
