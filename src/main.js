import { Vector3 } from 'three/math/Vector3';
// import loadMockData from './utils/loadMockData';
import Game from './Game';

const container = document.body;

const game = new Game();
game.connect();
container.appendChild(game.renderer.domElement);

// loadMockData((error, data) => {
//   if (!error) {
//     game.start(data);
//   }
// });

const multiplier = 200;

const data = require('../data').map(({ id, tsneVektor, cluster }) => {
  const [x, y, z] = tsneVektor;
  return {
    id,
    title: 'foo',
    info: 'bar',
    position: new Vector3(x * multiplier, y * multiplier, z * multiplier),
    cluster,
  };
});

game.start(data);
