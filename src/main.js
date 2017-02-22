import { createScene } from './scene';
import { createPlanet } from './planet';
import { createCamera, resizeCamera } from './camera';
import { createRenderer, resizeRenderer } from './renderer';

const scene = createScene();
const camera = createCamera();

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

const planet = createPlanet();
scene.add(planet);

camera.position.z = 5;

window.addEventListener('resize', resize, false);
render();


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function resize() {
  resizeCamera(camera);
  resizeRenderer(renderer);
}
