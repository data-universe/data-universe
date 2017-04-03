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

function updateBillboard(billboard, camera, worldPosition) {
  if (worldPosition.distanceTo(camera.position) > 40) {
    billboard.element.style.display = 'none';
  }
  else {
    billboard.quaternion.copy(camera.quaternion);
    billboard.element.style.display = 'block';
  }
}

export { createBillboard, updateBillboard };
