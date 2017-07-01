import { Clock } from 'three/core/Clock';
import { StereoEffect } from 'three_examples/effects/StereoEffect';
import CustomScene from './CustomScene';
import CustomCamera from './CustomCamera';
import CustomControls from './CustomControls';
import CustomRenderer from './CustomRenderer';
import Selector from './Selector';
import UI from './ui/UI';
import socket from './socket';

export default class Game {
  constructor() {
    this.render = this.render.bind(this);
    this.onMessage = this.onMessage.bind(this);

    this.clock = new Clock();
    this.camera = new CustomCamera();
    this.scene = new CustomScene(this.camera);
    this.controls = new CustomControls(this.camera);
    this.renderer = new CustomRenderer();
    this.stereoEffect = new StereoEffect(this.renderer);
    this.selector = new Selector();
    this.ui = new UI();

    // Needed to render ui
    this.scene.add(this.camera);
    this.camera.add(this.ui);
  }

  connect() {
    this.camera.connect();
    this.controls.connect();
    this.renderer.connect();
    this.selector.connect();
    socket.emitter.on('message', this.onMessage);
  }

  disconnect() {
    this.camera.disconnect();
    this.controls.disconnect();
    this.renderer.disconnect();
    this.selector.disconnect();
    socket.emitter.removeListener('message', this.onMessage);
  }

  resetPosition() {
    const { x, y, z } = this.scene.origin;
    this.camera.position.set(x, y, z + 200);
  }

  start(data) {
    this.scene.load(data);
    this.resetPosition();
    this.camera.lookAt(this.scene.origin);
    this.render();
  }

  render() {
    requestAnimationFrame(this.render);
    const delta = this.clock.getDelta();

    this.selector.update(this.scene, this.camera);
    this.controls.update(delta);
    this.scene.update();
    this.ui.update(this.selector);

    this.stereoEffect.render(this.scene, this.camera);
  }

  onMessage(message) {
    if (message.type === 'start:release') {
      this.resetPosition();
    }
  }
}
