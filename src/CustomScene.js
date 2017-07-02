import { Scene } from 'three/scenes/Scene';
import { FogExp2 } from 'three/scenes/FogExp2';
import { DirectionalLight } from 'three/lights/DirectionalLight';
import { AmbientLight } from 'three/lights/AmbientLight';
import { BufferGeometry } from 'three/core/BufferGeometry';
import { BufferAttribute } from 'three/core/BufferAttribute';
import { Points } from 'three/objects/Points';
import { PointsMaterial } from 'three/materials/PointsMaterial';
import { TextureLoader } from 'three/loaders/TextureLoader';
import { VertexColors } from 'three/constants';
import Stars from './Stars';
import PlanetBuffer from './PlanetBuffer';
import colors from './utils/colors';
import ClusterLabels from './ClusterLabels';

const ballImageUrl = require('../assets/ball.png');

export default class CustomScene extends Scene {
  constructor(camera) {
    super();

    this.camera = camera;

    this.fog = new FogExp2(0x000000, 0.00000025);

    const sun = new DirectionalLight(0xffffff);
    sun.position.set(-1, 0, 1).normalize();
    this.add(sun);

    const ambience = new AmbientLight(0x202020);
    this.add(ambience);

    const stars = new Stars();
    this.add(stars);

    this.planetsSet = new Set();
    this.planetBuffer = new PlanetBuffer(this, camera);

    this.clusterLabels = new ClusterLabels();
    this.add(this.clusterLabels);
  }

  addPlanet(planet) {
    this.add(planet);
    this.planetsSet.add(planet);
  }

  removePlanet(planet) {
    this.remove(planet);
    this.planetsSet.delete(planet);
  }

  getPlanets() {
    return [...this.planetsSet.values()];
  }

  load(data) {
    const positionsArray = new Float32Array(data.length * 3);
    const colorsArray = new Float32Array(data.length * 3);

    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      const i3 = i * 3;

      const position = item.position;
      positionsArray[i3 + 0] = position.x;
      positionsArray[i3 + 1] = position.y;
      positionsArray[i3 + 2] = position.z;

      const color = colors[item.cluster];
      colorsArray[i3 + 0] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
    }

    const geometry = new BufferGeometry();
    geometry.addAttribute('position', new BufferAttribute(positionsArray, 3));
    geometry.addAttribute('color', new BufferAttribute(colorsArray, 3));

    const sprite = new TextureLoader().load(ballImageUrl);
    const material = new PointsMaterial({
      size: 5,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
      vertexColors: VertexColors,
    });
    const points = new Points(geometry, material);
    this.add(points);

    this.origin = data[96].position.clone();

    this.planetBuffer.load(data);
    this.clusterLabels.load(data);
  }

  update() {
    this.planetBuffer.update();
    this.clusterLabels.update(this.camera.position);
  }
}
