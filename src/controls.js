import { FlyControls } from 'three_examples/controls/FlyControls';

function createControls(camera, container) {
  const controls = new FlyControls(camera);

  controls.movementSpeed = 2.0;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}

export { createControls };
