import { Color } from 'three/math/Color';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';
import { SphereGeometry } from 'three/geometries/SphereGeometry';
import { Mesh } from 'three/objects/Mesh';
import { Object3D } from 'three/core/Object3D';
import { pickRandom } from './utils/random';
import Billboard from './Billboard';

const materials = createMaterials();
const geometries = createGeometries();

export default class Planet extends Object3D {
  constructor(data) {
    super();

    this.position.copy(data.position);
    this.position.multiplyScalar(100);
    this.data = data;
    this.isPlanet = true;

    const geometry = pickRandom(geometries);
    const material = pickRandom(materials);
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
  const list = [];
  for (let h = 0; h <= 1; h += (1 / 10)) {
    const material = new MeshLambertMaterial({
      color: (new Color()).setHSL(h, 0.4, 0.5),
      reflectivity: 0.5,
    });
    list.push(material);
  }
  return list;
}

function createGeometries() {
  const list = [];
  for (let n = -5; n < 5; n += 1) {
    const r = 0.5 * (1.1 ** n);
    const geometry = new SphereGeometry(r, 32, 16);
    list.push(geometry);
  }
  return list;
}
