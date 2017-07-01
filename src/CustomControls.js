import { FlyControls } from 'three_examples/controls/FlyControls';
import { VRControls } from 'three_examples/controls/VRControls';
import XboxRemoteControls from './XboxRemoteControls';

export default class CustomControls {
  constructor(camera) {
    this.flyControls = createFlyControls(camera);
    this.vrControls = new VRControls(camera);
    this.xboxControls = new XboxRemoteControls(camera);
  }

  connect() {
    this.xboxControls.connect();
  }

  disconnect() {
    this.xboxControls.disconnect();
    // FlyControls is not disposed because it cannot be reconnected
    // TODO: Fix this to avoid memory leak.
  }

  update(delta, vrMode) {
    if (vrMode) {
      this.vrControls.update(delta);
    }
    else {
      this.flyControls.update(delta);
    }

    this.xboxControls.update(delta);
  }
}

function createFlyControls(camera) {
  const controls = new FlyControls(camera);

  controls.movementSpeed = 10.0;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;

  return controls;
}
