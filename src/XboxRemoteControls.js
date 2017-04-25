import { Vector2 } from 'three/math/Vector2';
import { Vector3 } from 'three/math/Vector3';
import { Quaternion } from 'three/math/Quaternion';

const joystickMagnitude = 32767.0;
const triggerMagnitude = 255.0;

export function XboxRemoteControls(object, socket) {
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

  socket.onopen = () => {};

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);
    switch (data.type) {
      case 'left:move':
        this.controls.movement.x = data.x;
        this.controls.movement.y = data.y;
        break;
      case 'right:move':
        this.controls.rotation.x = data.x;
        this.controls.rotation.y = data.y;
        break;
      case 'righttrigger':
        this.controls.elevate.up = data.x;
        break;
      case 'lefttrigger':
        this.controls.elevate.down = data.x;
        break;
      default:
        break;
    }
  };

  this.update = (delta) => {
    const movementMultiplier = (delta * this.movementSpeed);
    this.movement.x = this.controls.movement.x / joystickMagnitude;
    this.movement.y = (this.controls.elevate.up - this.controls.elevate.down) / triggerMagnitude;
    this.movement.z = this.controls.movement.y / joystickMagnitude;
    this.movement.multiplyScalar(movementMultiplier);

    this.object.translateX(this.movement.x);
    this.object.translateY(this.movement.y);
    this.object.translateZ(this.movement.z);

    // const rotationMultiplier = (delta * this.rotationSpeed) / joystickMagnitude;
    // this.rotation.set(this.controls.rotation.x, this.controls.rotation.y);
    // this.rotation.multiplyScalar(rotationMultiplier);
    // this.rotationQuaternion.set(-this.rotation.y, -this.rotation.x, 0, 1);
    // this.object.quaternion.multiply(this.rotationQuaternion);
  };
}
