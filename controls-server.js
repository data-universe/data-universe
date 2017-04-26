const XboxController = require('xbox-controller');
const WebSocket = require('ws');

const xbox = new XboxController();
const server = new WebSocket.Server({ port: 8081 });

server.on('connection', () => {
  /* eslint no-console: "allow" */
  console.log('Client connected.');
});

server.on('connection', (socket) => {
  socket.on('message', (packet) => {
    const message = JSON.parse(packet);
    switch (message.type) {
      case 'selected':
        console.log(message);
        broadcast(message);
        break;
    }
  });
});

xbox.on('left:move', (position) => {
  const message = {
    type: 'left:move',
    x: position.x,
    y: position.y,
  };
  broadcast(message);
});

xbox.on('right:move', (position) => {
  const message = {
    type: 'right:move',
    x: position.x,
    y: position.y,
  };
  broadcast(message);
});

xbox.on('lefttrigger', (position) => {
  const message = {
    type: 'lefttrigger',
    x: position,
  };
  broadcast(message);
});

xbox.on('righttrigger', (position) => {
  const message = {
    type: 'righttrigger',
    x: position,
  };
  broadcast(message);
});

xbox.on('a:release', (key) => {
  const message = {
    type: 'a:release',
  };
  broadcast(message);
});

function broadcast(message) {
  const packet = JSON.stringify(message);
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(packet);
    }
  });
}
