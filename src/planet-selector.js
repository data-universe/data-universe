import { Raycaster } from 'three/core/Raycaster';
import { Vector2 } from 'three/math/Vector2';

class PlanetSelector {
  constructor() {
    this.raycaster = new Raycaster();
    this.lastIntersection = null;
    this.timer = 0;
    this.selected = new Set();
    this.timeLimit = 3;
    this.selectionDistance = 25;
  }

  update(camera, delta, scene) {
    const cameraDirection = new Vector2(camera.getWorldDirection.x, camera.getWorldDirection.y);
    this.raycaster.setFromCamera(cameraDirection, camera);
    const tempPlanet = this.raycaster.intersectObjects(scene.children)[0];
    let currentPlanet;
    if (tempPlanet !== undefined) {
      if (tempPlanet.object.position.distanceTo(camera.position) < this.selectionDistance) {
        currentPlanet = tempPlanet.object;
      }
    }

    if (currentPlanet === this.lastIntersection) {
      this.timer += delta;
    }
    else if (currentPlanet !== this.lastIntersection) {
      this.timer = 0;
    }

    if (this.timer > this.timeLimit) {
      if (currentPlanet !== undefined) {
        this.selected.add(this.lastIntersection);
      }
      this.timer = 0;
    }

    this.lastIntersecion = currentPlanet;
  }
}

export { PlanetSelector };
