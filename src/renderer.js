import { WebGLRenderer } from 'three/renderers/WebGLRenderer';
import { CSS3DRenderer } from 'three_examples/renderers/CSS3DRenderer';
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

function createCSSRenderer(container) {
  const cssRenderer = new CSS3DRenderer();
  resizeRenderer(cssRenderer);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0';
  container.appendChild(cssRenderer.domElement);
  return cssRenderer;
}

function createStereoEffect(renderer) {
  return new StereoEffect(renderer);
}

export {
  createRenderer,
  resizeRenderer,
  createCSSRenderer,
  createStereoEffect,
};
