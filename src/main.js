import { Clock } from 'three/core/Clock';
import { StereoEffect } from 'three_examples/effects/StereoEffect';
import { loadMockData } from './utils/mock-data';
import { createScene } from './scene';
import { createPlanet, updatePlanet } from './planet';
import CustomCamera from './CustomCamera';
import CustomRenderer from './CustomRenderer';
import { createFlyControls, createVRControls } from './controls';
import { createStars } from './stars';
import { XboxRemoteControls } from './XboxRemoteControls';
import { Selector, selectOnKeyPress, selectOnXboxInput } from './selector';
import { createCrosshair } from './crosshair';

// ---
// Miscellaneous initialization
// ---
const container = document.body;
const remoteUrl = `ws://${window.location.hostname}:8081`;

const clock = new Clock();
const socket = new window.WebSocket(remoteUrl);

// ---
// Three.js initialization
// ---
const scene = createScene();
const camera = new CustomCamera();
camera.connect();
// Needed to render UI components attatched to camera
scene.add(camera);

const xboxControls = new XboxRemoteControls(camera);
let controls = createFlyControls(camera, container);
function controlsCallback(e) {
  // if alpha parameter exists, device supports gyroscope
  if (e.alpha) {
    controls = createVRControls(camera, container);
  }

  window.removeEventListener('deviceorientation', controlsCallback, true);
}
window.addEventListener('deviceorientation', controlsCallback, true);

const renderer = new CustomRenderer();
renderer.connect();
container.appendChild(renderer.domElement);
const stereoEffect = new StereoEffect(renderer);
const selector = new Selector();
window.addEventListener('keypress', event => selectOnKeyPress(event, selector, socket));

// ---
// Create scene
// ---
const stars = createStars();
scene.add(stars);

const crosshair = createCrosshair();
camera.add(crosshair);

const planets = [];
loadMockData((error, data) => {
  if (!error) {
    start(data);
  }
});

socket.onopen = () => {};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  xboxControls.onMessage(message);
  selectOnXboxInput(message, selector, socket);
  if (message.type === 'start:release') {
    resetPosition();
  }
};

function resetPosition() {
  camera.position.set(-194, 74, -29);
}

// ---
// Start the game loop
// ---
function start(data) {
  data.forEach((item) => {
    const planet = createPlanet(item);
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

  xboxControls.update(delta);
  selector.update(scene, camera);
  controls.update(delta);

  planets.forEach(planet => updatePlanet(planet, camera));

  stereoEffect.render(scene, camera);
}
