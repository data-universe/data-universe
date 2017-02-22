module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Quaternion } from 'three/math/Quaternion';
    import { Vector3 } from 'three/math/Vector3';

    const THREE = {
      Quaternion,
      Vector3,
    };

    ${content}

    const FlyControls = THREE.FlyControls;
    export { FlyControls };
  `;
};
