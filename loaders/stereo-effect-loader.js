module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { StereoCamera } from 'three/cameras/StereoCamera';

    const THREE = {
      StereoCamera,
    };

    ${content}

    const StereoEffect = THREE.StereoEffect;
    export { StereoEffect };
  `;
};
