import loadMockData from './utils/loadMockData';
import loadBigData from './utils/loadBigData';
import Game from './Game';

const container = document.body;

const game = new Game();
game.connect();
container.appendChild(game.renderer.domElement);

const useBigData = false;

function onDataLoad(err, data) {
  if (err) {
    throw err;
  }
  game.start(data);
}

if (useBigData) {
  loadBigData(onDataLoad);
}
else {
  loadMockData(onDataLoad);
}
