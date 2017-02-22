import { Clock } from 'three/core/Clock';
import { createScene } from './scene';
import { createPlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import { createRenderer, resizeRenderer } from './renderer';
import { createControls } from './controls';

const container = document.body;

const clock = new Clock();

const scene = createScene();
const camera = createCamera();
const controls = createControls(camera, container);
const renderer = createRenderer();
container.appendChild(renderer.domElement);

const planet = createPlanet();
scene.add(planet);

camera.position.z = 5;

window.addEventListener('resize', resize, false);
render();


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
