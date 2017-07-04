import { Object3D } from 'three/core/Object3D';
import Crosshair from './Crosshair';
import Popup from './Popup';

export default class UI extends Object3D {
  constructor() {
    super();

    this.crosshair = new Crosshair();
    this.add(this.crosshair);

    // this.popup = new Popup('Job saved!');
    // this.add(this.popup);

    // UI will appear 5 units away from the camera.
    this.position.set(0, 0, -5);
  }

  update(delta, selector) {
    this.crosshair.update(delta, selector);
    // this.popup.update(delta, selector);
  }
}
