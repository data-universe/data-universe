import { Clock } from 'three/core/Clock';
import { loadMockData } from './utils/mock-data';
import { createScene } from './scene';
import { createPlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import { createRenderer, resizeRenderer } from './renderer';
import { createControls } from './controls';
import { createStars } from './stars';

const container = document.body;

const clock = new Clock();

const scene = createScene();
const camera = createCamera();
const controls = createControls(camera, container);
const renderer = createRenderer(container);

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
    const planet = createPlanet();
    const position = obj.position;
    position.multiplyScalar(100);
    planet.position.copy(position);
    planets.push(planet);
    scene.add(planet);
  });
  camera.lookAt(planets[0].position);
  render();
}

function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
}

