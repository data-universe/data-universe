import { Vector2 } from 'three/math/Vector2';
import { Quaternion } from 'three/math/Quaternion';

const joystickMagnitude = 32767.0;

export function XboxRemoteControls(object, remoteUrl) {
  this.object = object;

  this.movementSpeed = 10.0;
  this.rotationSpeed = 0.5;

  this.movement = new Vector2(0, 0);
  this.rotation = new Vector2(0, 0);

  this.rotationQuaternion = new Quaternion();

  this.controls = {
    movement: { x: 0, y: 0 },
    rotation: { x: 0, y: 0 },
  };

  this.ws = new window.WebSocket(remoteUrl);

  this.ws.onopen = () => {};

  this.ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    switch (data.type) {
      case 'move':
        this.controls.movement.x = data.x;
        this.controls.movement.y = data.y;
        break;
      case 'rotate':
        this.controls.rotation.x = data.x;
        this.controls.rotation.y = data.y;
        break;
      default:
        break;
    }
  };

  this.update = (delta) => {
    const movementMultiplier = (delta * this.movementSpeed) / joystickMagnitude;
    this.movement.set(this.controls.movement.x, this.controls.movement.y);
    this.movement.multiplyScalar(movementMultiplier);

    this.object.translateX(this.movement.x);
    this.object.translateZ(this.movement.y);

    const rotationMultiplier = (delta * this.rotationSpeed) / joystickMagnitude;
    this.rotation.set(this.controls.rotation.x, this.controls.rotation.y);
    this.rotation.multiplyScalar(rotationMultiplier);
    this.rotationQuaternion.set(-this.rotation.y, -this.rotation.x, 0, 1);
    this.object.quaternion.multiply(this.rotationQuaternion);
  };
}
