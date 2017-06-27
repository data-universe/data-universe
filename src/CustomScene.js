import { Scene } from 'three/scenes/Scene';
import { Fog } from 'three/scenes/Fog';
import { DirectionalLight } from 'three/lights/DirectionalLight';
import { AmbientLight } from 'three/lights/AmbientLight';
import { BufferGeometry } from 'three/core/BufferGeometry';
import { BufferAttribute } from 'three/core/BufferAttribute';
import { Points } from 'three/objects/Points';
import { PointsMaterial } from 'three/materials/PointsMaterial';
import { TextureLoader } from 'three/loaders/TextureLoader';
import Stars from './Stars';
import PlanetBuffer from './PlanetBuffer';

const ballImageUrl = require('../assets/ball.png');

export default class CustomScene extends Scene {
  constructor() {
    super();

    this.fog = new Fog(0x000000, 0.1, 500);

    const sun = new DirectionalLight(0xffffff);
    sun.position.set(-1, 0, 1).normalize();
    this.add(sun);

    const ambience = new AmbientLight(0x202020);
    this.add(ambience);

    const stars = new Stars();
    this.add(stars);

    this.planetBuffer = new PlanetBuffer(this);
  }

  load(data) {
    const geometry = new BufferGeometry();
    const positions = new Float32Array(data.length * 3);

    data.forEach(({ position }, i) => {
      positions[(i * 3)] = position.x;
      positions[(i * 3) + 1] = position.y;
      positions[(i * 3) + 2] = position.z;
    });

    geometry.addAttribute('position', new BufferAttribute(positions, 3));

    const sprite = new TextureLoader().load(ballImageUrl);
    const material = new PointsMaterial({
      size: 5,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    const points = new Points(geometry, material);
    this.add(points);

    this.origin = data[96].position.clone();

    this.planetBuffer.load(data);
  }

  update(camera) {
    this.planetBuffer.update(camera);
  }
}
