import { WebGLRenderer } from 'three/renderers/WebGLRenderer';
import { CSS3DRenderer } from 'three_examples/renderers/CSS3DRenderer';

function createRenderer(container) {
  const renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  resizeRenderer(renderer);
  container.appendChild(renderer.domElement);

  const cssRenderer = new CSS3DRenderer();
  resizeRenderer(cssRenderer);
  cssRenderer.domElement.style.position = 'absolute';
  document.body.appendChild(cssRenderer.domElement);
  return renderer;
}

function resizeRenderer(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export { createRenderer, resizeRenderer };
