import { Color } from 'three/math/Color';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';
import { SphereGeometry } from 'three/geometries/SphereGeometry';
import { Mesh } from 'three/objects/Mesh';

const material = new MeshLambertMaterial({
  color: (new Color()).setHSL(0.5, 1.0, 0.5),
  reflectivity: 0.5,
});
const geometry = new SphereGeometry(0.5, 32, 16);

function createPlanet() {
  const planet = new Mesh(geometry, material);
  return planet;
}

export { createPlanet };
