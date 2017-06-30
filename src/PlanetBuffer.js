import Chunk from './PlanetBufferChunk';

export default class PlanetBuffer {
  constructor(scene, camera) {
    this.chunkSize = 25;
    this.chunks = {};
    this.lastChunkIndex = { xi: NaN, yi: NaN, zi: NaN };
    this.planets = [];
    this.scene = scene;
    this.camera = camera;
  }

  load(data) {
    data.forEach((item) => {
      const chunk = this.getChunkAtPosition(item.position);
      chunk.addPlanetData(item);
    });
    // Load the chunk at current position
    this.lastChunkIndex = this.getChunkIndexAtPosition(this.camera.position);
    this.getChunk(this.lastChunkIndex).load();
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
      chunks[xi][yi][zi] = new Chunk(this.scene);
    }
    return chunks[xi][yi][zi];
  }

  updatePosition(position) {
    const index = this.getChunkIndexAtPosition(position);
    const lastIndex = this.lastChunkIndex;
    if (index.xi !== lastIndex.xi || index.yi !== lastIndex.yi || index.zi !== lastIndex.zi) {
      this.getChunk(lastIndex).unload();
      this.getChunk(index).load();
      this.lastChunkIndex = index;
    }
  }

  update() {
    this.updatePosition(this.camera.position);
    this.planets.forEach(planet => planet.update(this.camera));
  }

}
