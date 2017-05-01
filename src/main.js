import { Clock } from 'three/core/Clock';
import { StereoEffect } from 'three_examples/effects/StereoEffect';
import { loadMockData } from './utils/mock-data';
import CustomScene from './CustomScene';
import CustomCamera from './CustomCamera';
import CustomRenderer from './CustomRenderer';
import CustomControls from './CustomControls';
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

const controls = new CustomControls(camera);
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

const crosshair = new Crosshair();
camera.add(crosshair);

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
  scene.load(data);
  const origin = scene.planets[96].position;
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
  scene.update(camera);

  stereoEffect.render(scene, camera);
}
