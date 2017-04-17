import { Clock } from 'three/core/Clock';
import { loadMockData } from './utils/mock-data';
import { createScene } from './scene';
import { createPlanet, updatePlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import { createRenderer, resizeRenderer, createCSSRenderer } from './renderer';
import { createControls } from './controls';
import { createStars } from './stars';
import { XboxRemoteControls } from './XboxRemoteControls';

const container = document.body;
const remoteUrl = 'ws://localhost:8080';

const clock = new Clock();

const scene = createScene();
const camera = createCamera();
const controls = new XboxRemoteControls(camera, remoteUrl);
const renderer = createRenderer(container);
const cssRenderer = createCSSRenderer(container);

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

  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
  resizeRenderer(cssRenderer);
}

