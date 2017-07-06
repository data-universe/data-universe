import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';
import socket from './socket';

export default class Selector {
  constructor() {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.isSelectPressed = false;
    this.oneFramePassed = false;

    this.raycaster = new Raycaster();
    this.selectionDistance = 30;
    this.intersection = null;
    this.selected = null;
  }

  update(scene, camera) {
    const cameraDirection = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(cameraDirection, camera);
    // TODO: Check intersation only when select button is pressed
    const intersection = this.raycaster.intersectObjects(scene.getPlanets(), true)[0];
    if (
      intersection &&
      intersection.distance < this.selectionDistance
    ) {
      this.intersection = intersection;
      this.selected = intersection.object;
    }
    else {
      this.intersection = null;
      this.selected = null;
    }

    if (this.isSelectPressed && !this.oneFramePassed) {
      this.oneFramePassed = true;
    }
    else if (this.isSelectPressed) {
      this.oneFramePassed = false;
      this.isSelectPressed = false;
    }
  }

  connect() {
    window.addEventListener('keypress', this.onKeyPress, false);
    socket.emitter.on('message', this.onMessage);
  }

  disconnect() {
    window.removeEventListener('keypress', this.onKeyPress);
    socket.emitter.removeListener('message', this.onMessage);
  }

  onKeyPress(event) {
    if (!this.isSelectPressed && event.code === 'Space') {
      this.isSelectPressed = true;
      this.select();
    }
  }

  onMessage(message) {
    if (!this.isSelectPressed && message.type === 'a:release') {
      this.isSelectPressed = true;
      this.select();
    }
  }

  select() {
    const selected = this.selected;
    let data;
    if (selected) {
      if (selected.parent.isPlanet) {
        data = selected.parent.data;
      }
      else if (selected.parent.isBillboard) {
        data = selected.parent.parent.data;
      }
    }

    socket.send({
      type: 'selected',
      data,
    });
  }
}
