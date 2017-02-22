import { WebGLRenderer } from 'three/renderers/WebGLRenderer';

function createRenderer() {
  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  resizeRenderer(renderer);
  return renderer;
}

function resizeRenderer(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export { createRenderer, resizeRenderer };
