import { Vector3 } from 'three/math/Vector3';
import { loadJSON } from './json';

function loadMockData(callback) {
  loadJSON('assets/100.json', (error, data) => {
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
  return {
    id: obj.annonsid,
    title: obj.rubrik,
    position: new Vector3(pos[0], pos[1], pos[2]),
  };
}

export { loadMockData };
