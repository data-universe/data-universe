import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';

export class Selector {
  constructor() {
    this.raycaster = new Raycaster();
    this.selectionDistance = 30;
    this.intersection = null;
    this.selected = null;
  }

  update(camera, delta, scene) {
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
}

export function selectOnKeyPress(event, selector, socket) {
  if (event.code === 'Space') {
    selectItem(selector, socket);
  }
}

function selectItem(selector, socket) {
  const selected = selector.selected;
  let data;
  if (selected) {
    if (selected.isPlanet) {
      data = selected.data;
    }
    else if (selected.isBillboard && selected.parent) {
      data = selected.parent.data;
    }
  }
  sendToServer(socket, {
    type: 'selected',
    data,
  });
}

function sendToServer(socket, data) {
  const message = JSON.stringify(data);
  socket.send(message);
}
