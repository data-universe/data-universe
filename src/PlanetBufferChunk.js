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

  update(camera) {
    const position = camera.position;
    const bufferDistanceSquared = this.bufferDistance ** 2;

    this.planetWrappers.forEach((wrapper) => {
      // We compare the squared distances since this is faster to compute
      const distanceToSquared = position.distanceToSquared(wrapper.position);

      if (wrapper.loaded) {
        if (distanceToSquared > bufferDistanceSquared) {
          wrapper.unload();
        }
        else {
          wrapper.update(camera);
        }
      }
      else if (distanceToSquared <= bufferDistanceSquared) {
        wrapper.load();
        wrapper.update(camera);
      }
    });
  }

  free() {
    this.planetWrappers.forEach(wrapper => wrapper.unload());
  }
}
