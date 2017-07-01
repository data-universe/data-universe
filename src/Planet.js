import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';
import { SphereGeometry } from 'three/geometries/SphereGeometry';
import { Mesh } from 'three/objects/Mesh';
import { Object3D } from 'three/core/Object3D';
import { pickRandom } from './utils/random';
import Billboard from './Billboard';
import colors from './utils/colors';

const materials = createMaterials();
const geometries = createGeometries();

export default class Planet extends Object3D {
  constructor(data) {
    super();

    this.position.copy(data.position);
    this.data = data;
    this.isPlanet = true;

    const geometry = pickRandom(geometries);
    const material = materials[data.cluster];
    const mesh = new Mesh(geometry, material);
    this.add(mesh);

    const radius = geometry.parameters.radius;
    const billboardHeight = radius + 0.15;
    this.billboard = new Billboard(data.title, data.info, billboardHeight);
    this.add(this.billboard);
  }

  update(camera) {
    this.billboard.update(camera);
  }
}

function createMaterials() {
  return colors.map(color => new MeshLambertMaterial({
    color,
    reflectivity: 0.5,
  }));
}

function createGeometries() {
  // const list = [];
  // for (let n = -5; n < 5; n += 1) {
  //   const r = 0.5 * (1.1 ** n);
  //   const geometry = new SphereGeometry(r, 32, 16);
  //   list.push(geometry);
  // }
  // return list;
  return [new SphereGeometry(0.5, 32, 16)];
}
