import { Color } from 'three/math/Color';
import { Object3D } from 'three/core/Object3D';
import { Matrix4 } from 'three/math/Matrix4';
import { Mesh } from 'three/objects/Mesh';
import { CylinderGeometry } from 'three/geometries/CylinderGeometry';
import { MeshBasicMaterial } from 'three/materials/MeshBasicMaterial';

export default class Compass extends Object3D {
  constructor(spawn) {
    super();

    const geometry = new CylinderGeometry(0, 0.2, 1, 20);
    geometry.rotateZ(-Math.PI / 2);
    const material = new MeshBasicMaterial({
      color: (new Color()).setHSL(0.8, 0.4, 0.5),
      reflectivity: 1.0,
      wireframe: true,
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.set(0.9, 2, 0);
    this.add(mesh);

    this.spawn = spawn;
    this.position.set(0, 0, -8);
    this.needsUpdate = true;
  }

  update(camera) {
    const m1 = new Matrix4();
    m1.lookAt(this.spawn, camera.position, camera.up);
    this.children[0].quaternion.setFromRotationMatrix(m1);
  }
}
