import { Vector3 } from 'three/math/Vector3';
import loadJson from './loadJson';

const multiplier = 100;

export default function loadMockData(callback) {
  loadJson('assets/100.json', (error, data) => {
    if (!error) {
      const mockData = data.map(extract);
      callback(undefined, mockData);
    }
    else {
      callback(error, undefined);
    }
  });
}

function extract(obj) {
  const pos = obj.vektor;
  const rubrik = obj.rubrik.charAt(0).toUpperCase() + obj.rubrik.slice(1);
  return {
    id: obj.annonsid,
    title: rubrik,
    info: obj.yrke,
    position: new Vector3(pos[0] * multiplier, pos[1] * multiplier, pos[2] * multiplier),
    cluster: obj.kluster,
  };
}
