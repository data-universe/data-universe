import { Color } from 'three/math/Color';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';
import { SphereGeometry } from 'three/geometries/SphereGeometry';
import { Mesh } from 'three/objects/Mesh';
import { createBillboard, updateBillboard } from './billboard';
import { pickRandom } from './utils/random';

const materials = createMaterials();
const geometries = createGeometries();

export function createPlanet(data) {
  const geometry = pickRandom(geometries);
  const material = pickRandom(materials);
  const planet = new Mesh(geometry, material);
  planet.position.copy(data.position);
  planet.position.multiplyScalar(100);
  planet.data = data;
  planet.isPlanet = true;

  const radius = geometry.parameters.radius;
  const billboardHeight = radius + 0.15;
  const billboard = createBillboard(data.title, billboardHeight);
  planet.billboard = billboard;
  planet.add(billboard);

  return planet;
}

export function updatePlanet(planet, camera) {
  updateBillboard(planet.billboard, camera);
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
