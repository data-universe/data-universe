import { Geometry } from 'three/core/Geometry';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { Vector3 } from 'three/math/Vector3';
import { LineSegments } from 'three/objects/LineSegments';

export default class Crosshair extends LineSegments {
  constructor() {
    const geometry = createGeometry(0.05);
    const material = createMaterial();

    super(geometry, material);
    this.position.set(0, 0, -5);
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
