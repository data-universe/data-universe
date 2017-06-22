import { Color } from 'three/math/Color';
import { Object3D } from 'three/core/Object3D';
import { Mesh } from 'three/objects/Mesh';
import { TetrahedronGeometry } from 'three/geometries/TetrahedronGeometry';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';

export default class Compass extends Object3D {
  constructor(spawn) {
    super();

    const geometry = new TetrahedronGeometry(0.8);
    const material = new MeshLambertMaterial({
      color: (new Color()).setHSL(0.8, 0.4, 0.5),
      reflectivity: 0.5,
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.set(1, 1, 0);
    mesh.position.multiplyScalar(2);
    this.add(mesh);

    this.spawn = spawn;
    this.position.set(0, 0, -8);
    return this;
  }

  update() {
    console.log(this.spawn);
    this.children[0].lookAt(this.spawn);
    this.lookAt(this.spawn);
  }
}
