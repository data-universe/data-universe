import { Object3D } from 'three/core/Object3D';
import Crosshair from './Crosshair';
import Popup from './Popup';

export default class UI extends Object3D {
  constructor() {
    super();

    this.crosshair = new Crosshair();
    this.add(this.crosshair);

    this.popup = new Popup('');
    this.add(this.popup);

    // UI will appear 5 units away from the camera.
    this.position.set(0, 0, -5);
  }

  update(selector) {
    this.crosshair.update(selector);
  }
}
