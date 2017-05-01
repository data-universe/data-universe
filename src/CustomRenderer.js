import { WebGLRenderer } from 'three/renderers/WebGLRenderer';

export default class CustomRenderer extends WebGLRenderer {
  constructor() {
    super();

    this.onResize = this.onResize.bind(this);

    this.setPixelRatio(window.devicePixelRatio);
    // Set initial size
    this.onResize();
  }

  connect() {
    window.addEventListener('resize', this.onResize, false);
  }

  disconnect() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setSize(window.innerWidth, window.innerHeight);
  }
}
