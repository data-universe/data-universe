module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Matrix4 } from 'three/math/Matrix4';

    const THREE = {
      Matrix4,
    };

    ${content}

    const VRControls = THREE.VRControls;
    export { VRControls };
  `;
};
