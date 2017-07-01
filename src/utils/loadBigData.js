import { Vector3 } from 'three/math/Vector3';
import loadJson from './loadJson';

const multiplier = 200;

export default function loadBigData(callback) {
  loadJson('assets/bigData.json', (error, data) => {
    if (!error) {
      const bigData = data.map(extract);
      callback(undefined, bigData);
    }
    else {
      callback(error, undefined);
    }
  });
}

function extract({ id, tsneVektor, cluster }) {
  const [x, y, z] = tsneVektor;
  return {
    id,
    title: 'foo',
    info: 'bar',
    position: new Vector3(x * multiplier, y * multiplier, z * multiplier),
    cluster,
  };
}
