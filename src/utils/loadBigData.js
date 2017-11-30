import { Vector3 } from 'three/math/Vector3';
import loadJson from './loadJson';

const multiplier = 300;

export default function loadBigData(callback) {
  loadJson('https://data-universe.github.io/data/af-data.json', (error, data) => {
    if (!error) {
      const bigData = data.map(extract);
      callback(undefined, bigData);
    }
    else {
      callback(error, undefined);
    }
  });
}

function extract({ id, title, info, tsneVektor, cluster, cluster_name }) {
  const [x, y, z] = tsneVektor;
  return {
    id,
    title,
    info,
    position: new Vector3(x * multiplier, y * multiplier, z * multiplier),
    cluster,
    clusterName: cluster_name,
  };
}
