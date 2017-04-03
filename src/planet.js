import { Color } from 'three/math/Color';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';
import { SphereGeometry } from 'three/geometries/SphereGeometry';
import { Mesh } from 'three/objects/Mesh';
import { createBillboard } from './billboard';

const material = new MeshLambertMaterial({
  color: (new Color()).setHSL(0.5, 1.0, 0.5),
  reflectivity: 0.5,
});
const geometry = new SphereGeometry(0.5, 32, 16);

function createPlanet(obj) {
  const planet = new Mesh(geometry, material);
  planet.position.copy(obj.position);
  planet.position.multiplyScalar(100);

  const billboard = createBillboard(obj.title);
  billboard.position.set(0, 0.75, 0);
  planet.add(billboard);

  return planet;
}

export { createPlanet };
