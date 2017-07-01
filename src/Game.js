import { Clock } from 'three/core/Clock';
import { VREffect } from 'vendor/VREffect';
import { WebVRManager } from 'webvr_boilerplate/webvr-manager';
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
    this.scene = new CustomScene();
    this.camera = new CustomCamera();
    this.controls = new CustomControls(this.camera);
    this.renderer = new CustomRenderer();
    this.stereoEffect = new VREffect(this.renderer);
    this.selector = new Selector();
    this.ui = new UI();

    this.manager = new WebVRManager(this.renderer, this.stereoEffect);

    // Needed to render ui
    this.scene.add(this.camera);
    this.camera.add(this.ui);

    this.resetPosition();
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
    this.camera.position.set(-194, 74, -29);
  }

  start(data) {
    this.scene.load(data);
    const origin = this.scene.planets[96].position;
    this.resetPosition();
    this.camera.lookAt(origin);
    if (this.manager.isVRCompatible) {
      this.manager.enterVRMode_();
    }
    this.render();
  }

  render() {
    requestAnimationFrame(this.render);
    const delta = this.clock.getDelta();

    if (this.manager.isVRCompatible) {
      this.selector.update(this.scene, this.camera);
      this.controls.update(delta, true);
      this.ui.update(delta, this.selector);
      this.scene.update(this.camera);

      this.stereoEffect.render(this.scene, this.camera);
    }
    else {
      this.selector.update(this.scene, this.camera);
      this.controls.update(delta, false);
      this.scene.update(this.camera);

      this.renderer.render(this.scene, this.camera);
    }
  }

  onMessage(message) {
    if (message.type === 'start:release') {
      this.resetPosition();
    }
  }
}
