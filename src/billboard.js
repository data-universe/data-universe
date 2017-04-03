import { Object3D } from 'three/core/Object3D';
import { CSS3DObject } from 'three_examples/renderers/CSS3DRenderer';

function createBillboard(text) {
  const element = document.createElement('div');
  element.className = 'billboard';
  element.style.display = 'block'; // 'none'; should be the default
  element.textContent = text;

  const inner = new CSS3DObject(element);
  const scale = 0.01;
  inner.scale.set(scale, scale, scale);
  inner.position.set(0, 0.75, 0);

  const billboard = new Object3D();
  billboard.add(inner);
  billboard.element = inner.element;

  return billboard;
}

function updateBillboard(billboard, camera) {
  if (billboard.getWorldPosition().distanceTo(camera.position) > 40) {
    billboard.element.style.display = 'none';
  }
  else {
    billboard.quaternion.copy(camera.quaternion);
    billboard.element.style.display = 'block';
  }
}

export { createBillboard, updateBillboard };
