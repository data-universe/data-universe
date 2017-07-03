import loadMockData from './utils/loadMockData';
import loadBigData from './utils/loadBigData';
import Game from './Game';

const game = new Game();
game.connect();

const useBigData = true;

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
