import { Geometry } from 'three/core/Geometry';
import { LineBasicMaterial } from 'three/materials/LineBasicMaterial';
import { Vector3 } from 'three/math/Vector3';
import { LineSegments } from 'three/objects/LineSegments';

export function createCrosshair() {
  const material = new LineBasicMaterial({
    color: '#fff',
    linewidth: 2,
    linecap: 'round',
    linejoin: 'round',
    opacity: 0.25,
    transparent: true,
  });

  const width = 0.025;
  const height = 0.025;

  const geometry = new Geometry();
  geometry.vertices.push(new Vector3(0, height, 0));
  geometry.vertices.push(new Vector3(0, -height, 0));
  geometry.vertices.push(new Vector3(-width, 0, 0));
  geometry.vertices.push(new Vector3(width, 0, 0));

  const cross = new LineSegments(geometry, material);
  cross.position.set(0, 0, -5);

  return cross;
}
