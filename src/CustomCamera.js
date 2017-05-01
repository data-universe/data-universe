import { PerspectiveCamera } from 'three/cameras/PerspectiveCamera';

export default class CustomCamera extends PerspectiveCamera {
  constructor() {
    super(25, window.innerWidth / window.innerHeight, 0.1, 1e7);

    this.onResize = this.onResize.bind(this);
  }

  connect() {
    window.addEventListener('resize', this.onResize, false);
  }

  disconnect() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}
