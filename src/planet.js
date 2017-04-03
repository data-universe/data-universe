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

function createPlanet() {
  const planet = new Mesh(geometry, material);
  const billboard = createBillboard('<h1>foobar</h1>');
  const node = planet.position;
  billboard.position.set(node.x, node.y + 0.5, node.z);
  planet.add(billboard);
  return planet;
}

export { createPlanet };
