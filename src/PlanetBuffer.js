import Planet from './Planet';

export default class PlanetBuffer {
  constructor(scene) {
    this.chunkSize = 25;
    this.chunks = {};
    this.lastChunkIndex = { xi: NaN, yi: NaN, zi: NaN };
    this.planets = [];
    this.scene = scene;
  }

  load(data) {
    data.forEach((item) => {
      const chunk = this.getChunkAtPosition(item.position);
      chunk.push(item);
    });
  }

  getChunkIndexAtPosition({ x, y, z }) {
    const xi = Math.floor(x / this.chunkSize);
    const yi = Math.floor(y / this.chunkSize);
    const zi = Math.floor(z / this.chunkSize);
    return { xi, yi, zi };
  }

  getChunkAtPosition(position) {
    const index = this.getChunkIndexAtPosition(position);
    return this.getChunk(index);
  }

  getChunk({ xi, yi, zi }) {
    const chunks = this.chunks;
    if (!chunks[xi]) {
      chunks[xi] = {};
    }
    if (!chunks[xi][yi]) {
      chunks[xi][yi] = {};
    }
    if (!chunks[xi][yi][zi]) {
      chunks[xi][yi][zi] = [];
    }
    return chunks[xi][yi][zi];
  }

  updatePosition(position) {
    const index = this.getChunkIndexAtPosition(position);
    const lastIndex = this.lastChunkIndex;
    if (index.xi !== lastIndex.xi || index.yi !== lastIndex.yi || index.zi !== lastIndex.zi) {
      this.scene.remove(...this.planets);
      const chunk = this.getChunk(index);
      this.planets = chunk.map(item => new Planet(item));

      if (this.planets.length > 0) {
        this.scene.add(...this.planets);
      }
      this.lastChunkIndex = index;
    }
  }

  update(camera) {
    this.updatePosition(camera.position);
    this.planets.forEach(planet => planet.update(camera));
  }

}
