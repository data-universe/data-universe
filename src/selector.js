import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';

class Selector {
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

export { Selector };
