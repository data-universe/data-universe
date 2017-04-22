import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';

class PlanetSelector {
  constructor() {
    this.raycaster = new Raycaster();
    this.lastIntersect = null;
    this.counter = 0;
    this.selected = new Set();
  }

  update(camera, scene) {
    const point = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(point, camera);
    const current = this.raycaster.intersectObjects(scene.children)[0];
    if (current && current === this.lastIntersect) {
      this.counter += 1;
    }
    else {
      this.lastIntersect = current;
    }

    if (this.current && this.counter > 42) {
      this.selected.push(this.current);
    }
  }
}

export { PlanetSelector };
