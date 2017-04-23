import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';

class PlanetSelector {
  constructor() {
    this.raycaster = new Raycaster();
    this.lastIntersect = null;
    this.timer = 0;
    this.selected = new Set();
    this.timeLimit = 3;
    this.selectionDistance = 25;
  }

  update(camera, delta, scene) {
    const point = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(point, camera);
    const temp = this.raycaster.intersectObjects(scene.children)[0];
    let current;
    if (temp !== undefined) {
      if (temp.object.position.distanceTo(camera.position) < this.selectionDistance) {
        current = temp.object;
      }
    }

    if (current === this.lastIntersect) {
      this.timer += delta;
    }
    else if (current !== this.lastIntersect) {
      this.timer = 0;
    }

    if (this.timer > this.timeLimit) {
      if (current !== undefined) {
        this.selected.add(this.lastIntersect);
      }
      this.timer = 0;
    }

    this.lastIntersect = current;
  }
}

export { PlanetSelector };
