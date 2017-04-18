module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Euler } from 'three/math/Euler';
    import { Vector3 } from 'three/math/Vector3';
    import { Quaternion } from 'three/math/Quaternion';
    import { _Math } from 'three/math/Math';

    const THREE = {
      Euler,
      Vector3,
      Quaternion,
      Math: _Math
    };

    ${content}

    const DeviceOrientationControls = THREE.DeviceOrientationControls;
    export { DeviceOrientationControls };
  `;
};
