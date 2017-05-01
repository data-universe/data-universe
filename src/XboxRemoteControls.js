import { Vector2 } from 'three/math/Vector2';
import { Vector3 } from 'three/math/Vector3';
import { Quaternion } from 'three/math/Quaternion';
import socket from './socket';

const joystickMagnitude = 32767.0;
const triggerMagnitude = 255.0;

export default class XboxRemoteControls {
  constructor(object) {
    this.onMessage = this.onMessage.bind(this);

    this.object = object;

    this.movementSpeed = 10.0;
    this.rotationSpeed = 0.5;

    this.movement = new Vector3(0, 0, 0);
    this.rotation = new Vector2(0, 0);

    this.rotationQuaternion = new Quaternion();

    this.controls = {
      movement: { x: 0, y: 0 },
      rotation: { x: 0, y: 0 },
      elevate: { up: 0, down: 0 },
    };
  }

  connect() {
    socket.emitter.on('message', this.onMessage);
  }

  disconnect() {
    socket.emitter.removeListener('message', this.onMessage);
  }

  onMessage(message) {
    switch (message.type) {
      case 'left:move':
        this.controls.movement.x = message.x;
        this.controls.movement.y = message.y;
        break;
      case 'right:move':
        this.controls.rotation.x = message.x;
        this.controls.rotation.y = message.y;
        break;
      case 'righttrigger':
        this.controls.elevate.up = message.x;
        break;
      case 'lefttrigger':
        this.controls.elevate.down = message.x;
        break;
      default:
        break;
    }
  }

  update(delta) {
    const movementMultiplier = (delta * this.movementSpeed);
    this.movement.x = this.controls.movement.x / joystickMagnitude;
    this.movement.y = (this.controls.elevate.up - this.controls.elevate.down) / triggerMagnitude;
    this.movement.z = this.controls.movement.y / joystickMagnitude;
    this.movement.multiplyScalar(movementMultiplier);

    this.object.translateX(this.movement.x);
    this.object.translateY(this.movement.y);
    this.object.translateZ(this.movement.z);
  }
}
