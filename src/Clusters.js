import { Vector3 } from 'three/math/Vector3';
import { Texture } from 'three/textures/Texture';
import { Object3D } from 'three/core/Object3D';
import { PlaneGeometry } from 'three/geometries/PlaneGeometry';
import { DoubleSide } from 'three/constants';
import { Mesh } from 'three/objects/Mesh';
import { MeshBasicMaterial } from 'three/materials/MeshBasicMaterial';

export default class Clusters extends Object3D {
  constructor() {
    super();
    this.visibleAtDistance = 150;
    this.labels = [];
  }

  load(data) {
    const clustersCount = 30;
    const sums = Array(clustersCount).fill().map(() => new Vector3());
    const names = Array(clustersCount).fill('');
    const counts = Array(clustersCount).fill(0);

    data.forEach(({ cluster, clusterName, position }) => {
      sums[cluster].add(position);
      let name = clusterName;
      if (clusterName.length > 22) {
        // TODO: use text wrapping instead
        name = clusterName.split(' ')[0];
        if (name.slice(-1) === ',') {
          name = name.slice(0, -1);
        }
      }
      names[cluster] = name;
      counts[cluster] += 1;
    });
    this.labels = sums.map((sum, i) => {
      const midpoint = sum.divideScalar(counts[i]);
      const label = createPlane(names[i]);
      label.scale.multiplyScalar(200);
      label.position.copy(midpoint);
      this.add(label);
      return label;
    });
  }

  update(camera) {
    const visibleAtDistance = this.visibleAtDistance;
    const labels = this.labels;
    for (let i = 0; i < labels.length; i += 1) {
      const label = labels[i];
      label.quaternion.copy(camera.quaternion);
      const distanceToCamera = camera.position.distanceTo(label.position);
      if (distanceToCamera > visibleAtDistance) {
        const distanceFromLimit = distanceToCamera - visibleAtDistance;
        label.material.opacity = Math.min(distanceFromLimit, 10) / 10;
      }
      else {
        label.material.opacity = 0;
      }
    }
  }

  distanceToNearestCluster(position) {
    let minSquared = Number.MAX_VALUE;
    this.labels.forEach((label) => {
      const distanceSquared = position.distanceToSquared(label.position);
      if (distanceSquared < minSquared) {
        minSquared = distanceSquared;
      }
    });
    return Math.sqrt(minSquared);
  }
}

// TODO: Provide a general util to create text planes (use also in ui/Popup.js)
function createPlane(text, subtext) {
  const texture = createTexture(text, subtext);
  texture.needsUpdate = true;
  const geometry = new PlaneGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    map: texture,
    side: DoubleSide,
    transparent: true,
  });
  const plane = new Mesh(geometry, material);
  return plane;
}

function createTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024; // 512;
  const context = canvas.getContext('2d');

  context.font = 'Normal 48px Arial';
  context.textAlign = 'center';
  context.fillStyle = 'rgba(245,245,245,0.75)';
  context.fillText(text, 512, 512);

  return new Texture(canvas);
}
