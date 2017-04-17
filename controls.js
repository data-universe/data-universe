const XboxController = require('xbox-controller');
const WebSocket = require('ws');

const xbox = new XboxController();
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  console.log('Client connected!');
});

xbox.on('left:move', (position) => {
  const data = {
    type: 'move',
    x: position.x,
    y: position.y,
  };
  const message = JSON.stringify(data);
  broadcast(message);
});

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
