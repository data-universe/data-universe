module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Vector3 } from 'three/math/Vector3';
    import { Matrix4 } from 'three/math/Matrix4';
    import { PerspectiveCamera } from 'three/cameras/PerspectiveCamera';
    const THREE = {
      Vector3,
      Matrix4,
      PerspectiveCamera,
    };
    ${content}
    const VREffect = THREE.VREffect;
    export { VREffect };
  `;
};
