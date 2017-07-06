import { FlyControls } from 'three_examples/controls/FlyControls';
import { DeviceOrientationControls } from 'three_examples/controls/DeviceOrientationControls';
import XboxRemoteControls from './XboxRemoteControls';

export default class CustomControls {
  constructor(camera, clusters) {
    this.camera = camera;
    this.clusters = clusters;
    this.initialMovementSpeed = 25.0;
    this.flyControls = createFlyControls(camera, this.initialMovementSpeed);
    this.vrControls = null;
    this.xboxControls = new XboxRemoteControls(camera);
    this.controls = this.flyControls;
    this.vrSupported = false;
    this.vrControlsEnabled = false;

    function onDeviceOrientation(e) {
      if (e.alpha) {
        // Device supports gyroscope.
        this.vrControls = createVRControls(camera);
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
    this.xboxControls.connect();
  }

  disconnect() {
    if (this.vrSupported) {
      this.vrControls.disconnect();
    }
    this.xboxControls.disconnect();
    // FlyControls is not disposed because it cannot be reconnected
    // TODO: Fix this to avoid memory leak.
  }

  update(delta) {
    const initialMovementSpeed = this.initialMovementSpeed;
    const limitDistance = 100;
    const accelerateDistance = 100;
    const maxSpeed = 200;
    const maxSpeedIncrease = maxSpeed - initialMovementSpeed;

    const distanceToNearestCluster = this.clusters.distanceToNearestCluster(this.camera.position);

    if (distanceToNearestCluster >= limitDistance) {
      const distanceFromLimit = distanceToNearestCluster - limitDistance;
      const ratio = Math.min(distanceFromLimit, accelerateDistance) / accelerateDistance;

      this.flyControls.movementSpeed = initialMovementSpeed + (ratio * maxSpeedIncrease);
    }
    else {
      this.flyControls.movementSpeed = initialMovementSpeed;
    }
    this.flyControls.update(delta);
    this.xboxControls.update(delta);
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

function createFlyControls(camera, movementSpeed) {
  const controls = new FlyControls(camera);

  controls.movementSpeed = movementSpeed;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}

function createVRControls(camera) {
  const controls = new DeviceOrientationControls(camera);
  controls.connect();

  return controls;
}
