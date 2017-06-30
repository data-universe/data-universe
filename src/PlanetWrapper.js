import Planet from './Planet';

export default class PlanetWrapper {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.position = data.position;
    this.loaded = false;
    this.planet = null;
  }

  load() {
    this.planet = new Planet(this.data);
    this.scene.add(this.planet);
    this.loaded = true;
  }

  unload() {
    this.scene.remove(this.planet);
    this.planet = null;
    this.loaded = false;
  }

  update(camera) {
    if (this.planet) {
      this.planet.update(camera);
    }
  }
}
