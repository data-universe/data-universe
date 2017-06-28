import { Object3D } from 'three/core/Object3D';
import Crosshair from './Crosshair';
import Compass from './Compass';

export default class UI extends Object3D {
  constructor(spawn) {
    super();

    this.crosshair = new Crosshair();
    this.add(this.crosshair);

    this.compass = new Compass(spawn);
    this.add(this.compass);

    // UI will appear 5 units away from the camera.
    this.position.set(0, 0, -5);
  }

  update(camera) {
    this.compass.update(camera);
  }
}
