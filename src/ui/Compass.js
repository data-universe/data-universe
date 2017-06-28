import { Color } from 'three/math/Color';
import { Object3D } from 'three/core/Object3D';
import { Vector3 } from 'three/math/Vector3';
import { Mesh } from 'three/objects/Mesh';
import { TetrahedronGeometry } from 'three/geometries/TetrahedronGeometry';
import { CylinderGeometry } from 'three/geometries/CylinderGeometry';
import { MeshLambertMaterial } from 'three/materials/MeshLambertMaterial';

export default class Compass extends Object3D {
  constructor(spawn) {
    super();

    // TODO: different colors on the faces or change geometric type
    // const geometry = new TetrahedronGeometry(0.8);
    const geometry = new CylinderGeometry(0, 0.2, 1, 50);
    geometry.rotateZ(-Math.PI / 2);
    //geometry.faces.map(face => face.color.setRGB(0, 0, 0));
    //geometry.colorsNeedUpdate = true;
    const material = new MeshLambertMaterial({
      color: (new Color()).setHSL(0.8, 0.4, 0.5),
      reflectivity: 1.0,
    });

    const mesh = new Mesh(geometry, material);
    mesh.position.set(1, 1, 0);
    mesh.position.multiplyScalar(1.2);
    this.add(mesh);

    this.spawn = spawn;
    this.position.set(0, 0, -8);
    this.needsUpdate = true;
  }

  update(camera) {
    const direction = new Vector3();
    direction.copy(this.spawn);
    direction.sub(camera.position);
    this.children[0].lookAt(direction);
  }
}
