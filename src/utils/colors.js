import { Color } from 'three/math/Color';

const clusterCount = 30;
const colors = new Array(clusterCount);
for (let i = 0; i < clusterCount; i += 1) {
  colors[i] = new Color().setHSL(i / clusterCount, 0.4, 0.5);
}

export default colors;
