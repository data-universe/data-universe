import { loadMockData } from './utils/mock-data';
import Game from './Game';

const container = document.body;

const game = new Game();
game.connect();
container.appendChild(game.renderer.domElement);

loadMockData((error, data) => {
  if (!error) {
    game.start(data);
  }
});
