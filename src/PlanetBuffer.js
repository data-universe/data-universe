import PlanetBufferChunk from './PlanetBufferChunk';

export default class PlanetBuffer {
  constructor(scene, camera) {
    this.chunkSize = 25; // The size of one chunk
    this.bufferSize = 2; // How many chunks in each direction should be loaded
    this.bufferDistance = this.bufferSize * this.chunkSize;
    this.chunks = {};
    this.chunkIndex = { xi: NaN, yi: NaN, zi: NaN };
    this.scene = scene;
    this.camera = camera;
    this.loadedChunks = [];
  }

  load(data) {
    data.forEach((item) => {
      const chunk = this.getChunkAtPosition(item.position);
      chunk.addPlanetData(item);
    });
    this.update();
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
      chunks[xi][yi][zi] = new PlanetBufferChunk(this.scene, this.bufferDistance);
    }
    return chunks[xi][yi][zi];
  }

  getChunksAround(centerChunkIndex) {
    const xiStart = centerChunkIndex.xi - this.bufferSize;
    const yiStart = centerChunkIndex.yi - this.bufferSize;
    const ziStart = centerChunkIndex.zi - this.bufferSize;
    const xiEnd = centerChunkIndex.xi + this.bufferSize;
    const yiEnd = centerChunkIndex.yi + this.bufferSize;
    const ziEnd = centerChunkIndex.zi + this.bufferSize;

    const chunks = [];
    for (let xi = xiStart; xi <= xiEnd; xi += 1) {
      for (let yi = yiStart; yi <= yiEnd; yi += 1) {
        for (let zi = ziStart; zi <= ziEnd; zi += 1) {
          chunks.push(this.getChunk({ xi, yi, zi }));
        }
      }
    }
    return chunks;
  }

  update() {
    const nextIndex = this.getChunkIndexAtPosition(this.camera.position);
    if (this.isNewIndex(nextIndex)) {
      const nextLoadedChunks = this.getChunksAround(nextIndex);
      const nextLoadedChunksSet = new Set(nextLoadedChunks);

      const chunksToUnload = this.loadedChunks.filter(chunk => !nextLoadedChunksSet.has(chunk));

      chunksToUnload.forEach(chunk => chunk.free());

      this.chunkIndex = nextIndex;
      this.loadedChunks = nextLoadedChunks;
    }
    this.loadedChunks.forEach(chunk => chunk.update(this.camera));
  }

  isNewIndex({ xi, yi, zi }) {
    const chunkIndex = this.chunkIndex;
    return xi !== chunkIndex.xi || yi !== chunkIndex.yi || zi !== chunkIndex.zi;
  }
}
