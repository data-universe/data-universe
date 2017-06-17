import { Color } from 'three/math/Color';
import { Object3D } from 'three/core/Object3D';
import { TetrahedronGeometry } from 'three/geometries/TetrahedronGeometry';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';

export default class Compass extends Object3D {
  constructor() {
    const geometry = new TetrahedronGeometry();
    const material = new MeshLambertMaterial({
      color: (new Color()).setHSL(0.8, 0.4, 0.5),
      reflectivity: 0.5,
    });

    super(geometry, material);
  }
}
