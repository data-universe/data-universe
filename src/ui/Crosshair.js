import { Geometry } from 'three/core/Geometry';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { Vector3 } from 'three/math/Vector3';
import { LineSegments } from 'three/objects/LineSegments';

export default class Crosshair extends LineSegments {
  constructor() {
    const geometry = createGeometry(0.05);
    const material = createMaterial();
    super(geometry, material);

    this.size = 0.05;
    this.selected = false;
    this.timer = 0;
    this.timeLimit = 30;
  }

  update(selector) {
    // TODO: Rewrite this animation using tweens.

    if (!this.selected && selector.isSelectPressed && selector.selected) {
      this.selected = true;
    }
    else if (this.selected && this.timer < this.timeLimit) {
      this.timer += 3;
      this.size += 0.002;
      this.updateGeometry(this.size);
    }
    else if (this.selected) {
      this.size = 0.05;
      this.updateGeometry(this.size);
      this.selected = false;
      this.timer = 0;
    }
  }

  updateGeometry(size) {
    const halfSize = size / 2;
    this.geometry.dynamic = true;
    this.geometry.vertices[0] = new Vector3(0, halfSize, 0);
    this.geometry.vertices[1] = new Vector3(0, -halfSize, 0);
    this.geometry.vertices[2] = new Vector3(-halfSize, 0, 0);
    this.geometry.vertices[3] = new Vector3(halfSize, 0, 0);
    this.geometry.verticesNeedUpdate = true;
  }

}

function createMaterial() {
  return new LineBasicMaterial({
    color: '#fff',
    linewidth: 2,
    linecap: 'round',
    linejoin: 'round',
    opacity: 0.25,
    transparent: true,
  });
}

function createGeometry(size) {
  const geometry = new Geometry();
  const halfSize = size / 2;
  geometry.vertices.push(new Vector3(0, halfSize, 0));
  geometry.vertices.push(new Vector3(0, -halfSize, 0));
  geometry.vertices.push(new Vector3(-halfSize, 0, 0));
  geometry.vertices.push(new Vector3(halfSize, 0, 0));
  return geometry;
}

