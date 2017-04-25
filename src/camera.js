import { PerspectiveCamera } from 'three/cameras/PerspectiveCamera';

export function createCamera() {
  const camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1e7);
  camera.position.z = 5;
  return camera;
}

export function resizeCamera(camera) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
