module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Object3D } from 'three/core/Object3D';
    import { Matrix4 } from 'three/math/Matrix4';
    const THREE = {
      Object3D,
      Matrix4,
    };
    ${content}
    const ViveController = THREE.ViveController;
    export { ViveController };
  `;
};
