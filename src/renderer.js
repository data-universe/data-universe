import { WebGLRenderer } from 'three/renderers/WebGLRenderer';
import { StereoEffect } from 'three_examples/effects/StereoEffect';

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

function createStereoEffect(renderer) {
  return new StereoEffect(renderer);
}

export {
  createRenderer,
  resizeRenderer,
  createStereoEffect,
};
