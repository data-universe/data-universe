import { Vector2 } from 'three/math/Vector2';

const joystickMagnitude = 32767.0;

export function XboxRemoteControls(object, remoteUrl) {
  this.object = object;
  this.movementSpeed = 10.0 / joystickMagnitude;
  this.movement = new Vector2(0, 0);

  this.controls = {
    movement: { x: 0, y: 0 },
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
      default:
        break;
    }
  };

  this.update = (delta) => {
    const movementMultiplier = delta * this.movementSpeed;
    this.movement.set(this.controls.movement.x, this.controls.movement.y);
    this.movement.multiplyScalar(movementMultiplier);

    this.object.translateX(this.movement.x);
    this.object.translateZ(this.movement.y);
  };
}
