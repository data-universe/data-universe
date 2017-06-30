import Planet from './Planet';

export default class PlanetBufferChunk {
  constructor(scene) {
    this.scene = scene;
    this.planetData = [];
    this.planets = [];
  }

  addPlanetData(data) {
    this.planetData.push(data);
  }

  load() {
    this.planets = this.planetData.map(item => new Planet(item));
    if (this.planets.length > 0) {
      this.scene.add(...this.planets);
    }
  }

  unload() {
    if (this.planets.length > 0) {
      this.scene.remove(...this.planets);
      this.planets.length = 0;
    }
  }
}
