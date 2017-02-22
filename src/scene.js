import { Scene } from 'three/scenes/Scene';
import { FogExp2 } from 'three/scenes/FogExp2';
import { DirectionalLight } from 'three/lights/DirectionalLight';
import { AmbientLight } from 'three/lights/AmbientLight';

function createScene() {
  const scene = new Scene();

  scene.fog = new FogExp2(0x000000, 0.00000025);

  const sun = new DirectionalLight(0xffffff);
  sun.position.set(-1, 0, 1).normalize();
  scene.add(sun);

  const ambience = new AmbientLight(0x202020);
  scene.add(ambience);

  return scene;
}

export { createScene };
