import { Clock } from 'three/core/Clock';
import { loadMockData } from './utils/mock-data';
import { createScene } from './scene';
import { createPlanet, updatePlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import {
  createRenderer,
  resizeRenderer,
  createCSSRenderer,
  createStereoEffect,
} from './renderer';
import { createFlyControls, createVRControls } from './controls';
import { createStars } from './stars';

const container = document.body;

const clock = new Clock();

const scene = createScene();
const camera = createCamera();

let controls = createFlyControls(camera, container);
function controlsCallback(e) {
  // if alpha parameter exists, device supports gyroscope
  if (e.alpha) {
    controls = createVRControls(camera, container);
  }

  window.removeEventListener('deviceorientation', controlsCallback, true);
}
window.addEventListener('deviceorientation', controlsCallback, true);

const renderer = createRenderer(container);
const cssRenderer = createCSSRenderer(container);
const stereoEffect = createStereoEffect(renderer);

const stars = createStars();
scene.add(stars);

const planets = [];

window.addEventListener('resize', resize, false);

loadMockData((error, data) => {
  if (!error) {
    start(data);
  }
});

function start(data) {
  data.forEach((obj) => {
    const planet = createPlanet(obj);
    planets.push(planet);
    scene.add(planet);
  });
  const origin = planets[0].position;
  camera.position.set(origin.x, origin.y, origin.z + 10);
  camera.lookAt(origin);
  render();
}

function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();

  controls.update(delta);
  planets.forEach(planet => updatePlanet(planet, camera));

  cssRenderer.render(scene, camera);
  stereoEffect.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
  resizeRenderer(cssRenderer);
}

