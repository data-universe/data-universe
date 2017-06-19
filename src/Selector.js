import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';
import socket from './socket';

export default class Selector {
  constructor() {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.selectEvent = false;
    this.timer = 0;

    this.raycaster = new Raycaster();
    this.selectionDistance = 30;
    this.intersection = null;
    this.selected = null;
  }

  update(scene, camera) {
    const cameraDirection = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(cameraDirection, camera);
    const intersection = this.raycaster.intersectObjects(scene.planets, true)[0];
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

    if (this.selectEvent && this.timer < 5) {
      this.timer += 1;
    }
    else if (this.selectEvent && this.timer >= 5) {
      this.timer = 0;
      this.selectEvent = false;
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
    if (!this.selectEvent && event.code === 'Space') {
      this.selectEvent = true;
      this.select();
    }
  }

  onMessage(message) {
    if (!this.selectEvent && message.type === 'a:release') {
      this.selectEvent = true;
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
      else if (selected.type === 'Mesh' && selected.parent.parent) {
        data = selected.parent.parent.data;
      }
    }

    socket.send({
      type: 'selected',
      data,
    });
  }
}
