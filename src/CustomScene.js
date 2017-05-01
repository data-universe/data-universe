import { Scene } from 'three/scenes/Scene';
import { Fog } from 'three/scenes/Fog';
import { DirectionalLight } from 'three/lights/DirectionalLight';
import { AmbientLight } from 'three/lights/AmbientLight';

export default class CustomScene extends Scene {
  constructor() {
    super();

    this.fog = new Fog(0x000000, 0.1, 250);

    const sun = new DirectionalLight(0xffffff);
    sun.position.set(-1, 0, 1).normalize();
    this.add(sun);

    const ambience = new AmbientLight(0x202020);
    this.add(ambience);
  }
}
