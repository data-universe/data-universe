const XboxController = require('xbox-controller');
const WebSocket = require('ws');

const xbox = new XboxController();
const wss = new WebSocket.Server({ port: 8080 });

xbox.on('left:move', (position) => {
  const data = {
    type: 'move',
    x: position.x,
    y: position.y,
  };
  broadcast(data);
});

xbox.on('right:move', (position) => {
  const data = {
    type: 'rotate',
    x: position.x,
    y: position.y,
  };
  broadcast(data);
});

function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
