import EventEmitter from 'events';

class CustomSocket {
  constructor(url) {
    this.url = url;
    this.socket = new window.WebSocket(url);
    this.emitter = new EventEmitter();

    this.socket.onmessage = () => {
      const message = JSON.parse(event.data);
      this.emitter.emit('message', message);
    };
  }

  send(message) {
    const packet = JSON.stringify(message);
    this.socket.send(packet);
  }
}

const remoteUrl = `ws://${window.location.hostname}:8081`;
const socket = new CustomSocket(remoteUrl);

export default socket;

