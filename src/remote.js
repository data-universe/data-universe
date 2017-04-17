const ws = new window.WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('WebSocket connection open!');
};

ws.onmessage = (message) => {
  console.log(message.data);
};
