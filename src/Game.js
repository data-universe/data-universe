import { Object3D } from 'three/core/Object3D';
import { Clock } from 'three/core/Clock';
import { WebVR } from 'three_examples/vr/WebVR';
import { Vector3 } from 'three/math/Vector3';
import Tween from 'tween/tween';
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
    this.controls = new CustomControls(this.camera, this.scene.clusters);
    this.renderer = new CustomRenderer();
    this.selector = new Selector();
    this.ui = new UI();

    const container = document.body;
    container.appendChild(this.renderer.domElement);

    this.scene.add(this.camera);
    this.camera.add(this.ui);

    // Enable VR
    this.renderer.vr.enabled = true;
    WebVR.getVRDisplay((display) => {
      this.renderer.vr.setDevice(display);
      document.body.appendChild(WebVR.getButton(display, this.renderer.domElement));
    });

    // Overview
    this.overviewPosition = { x: 0, y: 0, z: 0 };
    this.overviewDirection = new Vector3(0, 0, 0);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  connect() {
    this.camera.connect();
    this.controls.connect();
    this.renderer.connect();
    this.selector.connect();
    window.addEventListener('keypress', this.onKeyPress, false);
    socket.emitter.on('message', this.onMessage);
  }

  disconnect() {
    this.camera.disconnect();
    this.controls.disconnect();
    this.renderer.disconnect();
    this.selector.disconnect();
    window.removeEventListener('keypress', this.onKeyPress);
    socket.emitter.removeListener('message', this.onMessage);
  }

  resetPosition() {
    const { x, y, z } = this.scene.origin;
    this.camera.position.set(x, y, z + 200);
  }

  overview() {
    const { x, y, z } = this.scene.origin;
    const targetPosition = { x, y, z: z + 200 };
    const position = this.camera.position;
    this.overviewPosition = { x: position.x, y: position.y, z: position.z };
    const tweenPosition = new Tween.Tween(this.camera.position).to(targetPosition, 2000);
    tweenPosition.easing(Tween.Easing.Exponential.Out);
    tweenPosition.start();
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
    Tween.update();

    this.selector.update(this.scene, this.camera);
    this.controls.update(delta);
    this.scene.update();
    this.ui.update(delta, this.selector);

    this.renderer.render(this.scene, this.camera);
  }

  onKeyPress(event) {
    if (event.code === 'Digit1') {
      this.overview();
    }
    // else if (event.code === 'Digit2') {
    //   this.overview(this.overviewPosition);
    // }
  }

  onMessage(message) {
    if (message.type === 'start:release') {
      this.resetPosition();
    }
    else if (message.type === 'b') {
      this.overview();
    }
    else if (message.type === 'b:release') {
      this.overview(this.overviewPosition);
    }
  }
}
