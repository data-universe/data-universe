import { Clock } from 'three/core/Clock';
import { StereoEffect } from 'three_examples/effects/StereoEffect';
import { loadMockData } from './utils/mock-data';
import CustomScene from './CustomScene';
import Planet from './Planet';
import CustomCamera from './CustomCamera';
import CustomRenderer from './CustomRenderer';
import CustomControls from './CustomControls';
import Stars from './Stars';
import Selector from './Selector';
import Crosshair from './Crosshair';
import socket from './socket';

const container = document.body;

// ---
// Miscellaneous initialization
// ---

const clock = new Clock();

// ---
// Three.js initialization
// ---
const scene = new CustomScene();
const camera = new CustomCamera();
camera.connect();
// Needed to render UI components attatched to camera
scene.add(camera);

const controls = new CustomControls(camera, container);
controls.connect();

const renderer = new CustomRenderer();
renderer.connect();
container.appendChild(renderer.domElement);
const stereoEffect = new StereoEffect(renderer);
const selector = new Selector();
selector.connect();

// ---
// Create scene
// ---
const stars = new Stars();
scene.add(stars);

const crosshair = new Crosshair();
camera.add(crosshair);

const planets = [];
loadMockData((error, data) => {
  if (!error) {
    start(data);
  }
});

socket.emitter.on('message', (message) => {
  if (message.type === 'start:release') {
    resetPosition();
  }
});

function resetPosition() {
  camera.position.set(-194, 74, -29);
}

// ---
// Start the game loop
// ---
function start(data) {
  data.forEach((item) => {
    const planet = new Planet(item);
    planets.push(planet);
    scene.add(planet);
  });
  const origin = planets[96].position;
  camera.position.set(-194, 74, -29);
  camera.lookAt(origin);
  render();
}

// render() is looped
function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();

  selector.update(scene, camera);
  controls.update(delta);

  planets.forEach(planet => planet.update(camera));

  stereoEffect.render(scene, camera);
}
