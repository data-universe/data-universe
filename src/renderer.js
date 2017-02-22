import { WebGLRenderer } from 'three/renderers/WebGLRenderer';

function createRenderer(container) {
  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  resizeRenderer(renderer);
  container.appendChild(renderer.domElement);
  return renderer;
}

function resizeRenderer(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export { createRenderer, resizeRenderer };
