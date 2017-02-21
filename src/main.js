import { Scene } from 'three/scenes/Scene';
import { PerspectiveCamera } from 'three/cameras/PerspectiveCamera';
import { WebGLRenderer } from 'three/renderers/WebGLRenderer';
import { BoxGeometry } from 'three/geometries/BoxGeometry';
import { MeshBasicMaterial } from 'three/materials/MeshBasicMaterial';
import { Mesh } from 'three/objects/Mesh';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
render();

