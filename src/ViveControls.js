import { ViveController } from 'three_examples/vr/ViveController';

export default class ViveControls {
  constructor(body) {
    this.body = body;
    this.controller1 = new ViveController(0);
    this.controller2 = new ViveController(1);
    this.state = {
      forwards: false,
      backwards: false,
    };
    this.movementSpeed = 10.0;

    this.onRightTriggerDown = this.onRightTriggerDown.bind(this);
    this.onRightTriggerUp = this.onRightTriggerUp.bind(this);
    this.onLeftTriggerDown = this.onLeftTriggerDown.bind(this);
    this.onLeftTriggerUp = this.onLeftTriggerUp.bind(this);
  }

  onRightTriggerDown() {
    this.state.forwards = true;
  }
  onRightTriggerUp() {
    this.state.forwards = false;
  }
  onLeftTriggerDown() {
    this.state.backwards = true;
  }
  onLeftTriggerUp() {
    this.state.backwards = false;
  }

  connect() {
    this.controller1.addEventListener('triggerdown', this.onRightTriggerDown);
    this.controller1.addEventListener('triggerup', this.onRightTriggerUp);
    this.controller2.addEventListener('triggerdown', this.onLeftTriggerDown);
    this.controller2.addEventListener('triggerup', this.onLeftTriggerUp);
  }

  disconnect() {
    this.controller1.removeEventListener('triggerdown', this.onRightTriggerDown);
    this.controller1.removeEventListener('triggerup', this.onRightTriggerUp);
    this.controller2.removeEventListener('triggerdown', this.onLeftTriggerDown);
    this.controller2.removeEventListener('triggerup', this.onLeftTriggerUp);
  }

  update(delta) {
    this.controller1.update();
    this.controller2.update();

    const movement = this.movementSpeed * delta;
    if (this.state.forwards !== this.state.backwards) {
      const direction = this.body.camera.getWorldDirection();
      direction.normalize();
      direction.multiplyScalar(movement);

      if (this.state.backwards) {
        direction.multiplyScalar(-1);
      }
      this.body.position.add(direction);
    }
  }
}
