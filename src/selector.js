import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';
import socket from './socket';

export default class Selector {
  constructor() {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMessage = this.onMessage.bind(this);

    this.raycaster = new Raycaster();
    this.selectionDistance = 30;
    this.intersection = null;
    this.selected = null;
  }

  update(scene, camera) {
    const cameraDirection = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(cameraDirection, camera);
    const intersection = this.raycaster.intersectObjects(scene.children)[0];
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
    if (event.code === 'Space') {
      this.select();
    }
  }

  onMessage(message) {
    if (message.type === 'a:release') {
      this.select();
    }
  }

  select() {
    const selected = this.selected;
    let data;
    if (selected) {
      if (selected.isPlanet) {
        data = selected.data;
      }
      else if (selected.isBillboard && selected.parent) {
        data = selected.parent.data;
      }
    }
    socket.send({
      type: 'selected',
      data,
    });
  }
}
