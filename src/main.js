import { Clock } from 'three/core/Clock';
import { loadMockData } from './utils/mock-data';
import { createScene } from './scene';
import { createPlanet, updatePlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import {
  createRenderer,
  resizeRenderer,
  createStereoEffect,
} from './renderer';
import { createFlyControls, createVRControls } from './controls';
import { createStars } from './stars';
import { XboxRemoteControls } from './XboxRemoteControls';
import { PlanetSelector } from './planet-selector';

const container = document.body;
const remoteUrl = `ws://${window.location.hostname}:8081`;

const clock = new Clock();

const scene = createScene();
const camera = createCamera();

const xboxControls = new XboxRemoteControls(camera, remoteUrl);
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
const stereoEffect = createStereoEffect(renderer);
const planetSelector = new PlanetSelector();

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

  xboxControls.update(delta);
  planetSelector.update(camera, delta, scene);
  controls.update(delta);
  planets.forEach(planet => updatePlanet(planet, camera));

  stereoEffect.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
}

