import { FlyControls } from 'three_examples/controls/FlyControls';
import { DeviceOrientationControls } from 'three_examples/controls/DeviceOrientationControls';

export default class CustomControls {
  constructor(camera, container) {
    this.flyControls = createFlyControls(camera, container);
    this.vrControls = null;
    this.controls = this.flyControls;
    this.vrSupported = false;
    this.vrControlsEnabled = false;

    function onDeviceOrientation(e) {
      if (e.alpha) {
        // Device supports gyroscope.
        this.vrControls = createVRControls(camera, container);
        this.vrSupported = true;
        this.toggleVrControls(true);
      }
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    }
    window.addEventListener('deviceorientation', onDeviceOrientation, true);
  }

  connect() {
    if (this.vrSupported) {
      this.vrControls.connect();
    }
  }

  disconnect() {
    if (this.vrSupported) {
      this.vrControls.disconnect();
    }
    this.flyControls.dispose();
  }

  update(delta) {
    this.controls.update(delta);
  }

  toggleVrControls(enabled) {
    if (this.vrSupported) {
      this.vrControlsEnabled = enabled !== undefined ? enabled : !this.vrControlsEnabled;
      if (this.vrControlsEnabled) {
        this.controls = this.vrControls;
      }
      else {
        this.controls = this.flyControls;
      }
    }
  }
}

function createFlyControls(camera, container) {
  const controls = new FlyControls(camera, container);

  controls.movementSpeed = 10.0;
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
