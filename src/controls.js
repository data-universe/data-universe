import { FlyControls } from 'three_examples/controls/FlyControls';

function createControls(camera, container) {
  const controls = new FlyControls(camera, container);

  controls.movementSpeed = 2.0;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}

export { createControls };
