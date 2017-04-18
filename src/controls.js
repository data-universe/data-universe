import { FlyControls } from 'three_examples/controls/FlyControls';
import { DeviceOrientationControls } from 'three_examples/controls/DeviceOrientationControls';

function createFlyControls(camera, container) {
  const controls = new FlyControls(camera, container);

  controls.movementSpeed = 2.0;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}

function createVRControls(camera, container) {
  const controls = new DeviceOrientationControls(camera, container);
  controls.connect();

  return controls;
}

export { createFlyControls, createVRControls };
