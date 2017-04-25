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
import { Selector } from './selector';
import { createCrosshair } from './crosshair';

const container = document.body;
const remoteUrl = `ws://${window.location.hostname}:8081`;

const clock = new Clock();
const socket = new window.WebSocket(remoteUrl);

const scene = createScene();
const camera = createCamera();
// Needed to render UI components attatched to camera
scene.add(camera);

const xboxControls = new XboxRemoteControls(camera, socket);
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
const selector = new Selector();

const stars = createStars();
scene.add(stars);

const crosshair = createCrosshair();
crosshair.position.set(0, 0, -5);
camera.add(crosshair);

const planets = [];

window.addEventListener('resize', resize, false);
window.addEventListener('keypress', onKeyPress);

loadMockData((error, data) => {
  if (!error) {
    start(data);
  }
});

function start(data) {
  data.forEach((item) => {
    const planet = createPlanet(item);
    planets.push(planet);
    scene.add(planet);
  });
  const origin = planets[96].position;
  camera.position.set(-100, 70, 30);
  camera.lookAt(origin);
  render();
}

function render() {
  requestAnimationFrame(render);
  const delta = clock.getDelta();

  xboxControls.update(delta);
  selector.update(camera, delta, scene);
  controls.update(delta);
  planets.forEach(planet => updatePlanet(planet, camera));

  stereoEffect.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
}

function onKeyPress(event) {
  if (event.code === 'Space') {
    selectItem();
  }
}

function selectItem() {
  const selected = selector.selected;
  let data;
  if (selected) {
    if (selected.isPlanet) {
      data = selected.data;
    }
    else if (selected.isBillboard && selected.parent) {
      data = selected.parent.data;
    }
  }
  sendToServer({
    type: 'selected',
    data,
  });
}

function sendToServer(data) {
  const message = JSON.stringify(data);
  socket.send(message);
}
