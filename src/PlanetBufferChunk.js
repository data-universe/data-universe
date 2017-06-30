import PlanetWrapper from './PlanetWrapper';

export default class PlanetBufferChunk {
  constructor(scene, bufferDistance) {
    this.scene = scene;
    this.bufferDistance = bufferDistance;
    this.planetWrappers = [];
    this.planets = [];
  }

  addPlanetData(data) {
    this.planetWrappers.push(new PlanetWrapper(this.scene, data));
  }

  update(position) {
    // We compare the squared distances since this is faster to compute
    const bufferDistanceSquared = this.bufferDistance ** 2;

    this.planetWrappers.forEach((wrapper) => {
      const distanceToSquared = position.distanceToSquared(wrapper.position);

      if (wrapper.loaded) {
        if (distanceToSquared > bufferDistanceSquared) {
          wrapper.unload();
        }
      }
      else if (distanceToSquared <= bufferDistanceSquared) {
        wrapper.load();
      }
    });
  }

  free() {
    this.planetWrappers.forEach(wrapper => wrapper.unload());
  }
}
