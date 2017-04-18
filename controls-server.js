const XboxController = require('xbox-controller');
const WebSocket = require('ws');

const xbox = new XboxController();
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', () => {
  /* eslint no-console: "allow" */
  console.log('Client connected.');
});

xbox.on('left:move', (position) => {
  const data = {
    type: 'left:move',
    x: position.x,
    y: position.y,
  };
  broadcast(data);
});

xbox.on('right:move', (position) => {
  const data = {
    type: 'right:move',
    x: position.x,
    y: position.y,
  };
  broadcast(data);
});

xbox.on('lefttrigger', (position) => {
  const data = {
    type: 'lefttrigger',
    x: position,
  };
  broadcast(data);
});

xbox.on('righttrigger', (position) => {
  const data = {
    type: 'righttrigger',
    x: position,
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
