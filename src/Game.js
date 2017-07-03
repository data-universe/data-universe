import { Object3D } from 'three/core/Object3D';
import { Clock } from 'three/core/Clock';
import { WebVR } from 'three_examples/vr/WebVR';
import CustomScene from './CustomScene';
import CustomCamera from './CustomCamera';
import ViveControls from './ViveControls';
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
    this.body = new Object3D();
    this.scene = new CustomScene(this.camera);
    this.controls = new ViveControls(this.body);
    this.renderer = new CustomRenderer();
    this.selector = new Selector();
    this.ui = new UI();

    const container = document.body;
    container.appendChild(this.renderer.domElement);

    this.scene.add(this.camera);
    this.body.camera = this.camera;
    this.body.add(this.camera);
    this.scene.add(this.body);

    // Enable VR
    this.renderer.vr.enabled = true;
    WebVR.getVRDisplay((display) => {
      this.renderer.vr.setDevice(display);
      document.body.appendChild(WebVR.getButton(display, this.renderer.domElement));
    });
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
    this.animate();
  }

  animate() {
    this.renderer.animate(this.render);
  }

  render() {
    const delta = this.clock.getDelta();

    this.selector.update(this.scene, this.camera);
    this.controls.update(delta);
    this.scene.update();
    this.ui.update(delta, this.selector);

    this.renderer.render(this.scene, this.camera);
  }

  onMessage(message) {
    if (message.type === 'start:release') {
      this.resetPosition();
    }
  }
}
