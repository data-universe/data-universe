module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { Object3D } from 'three/core/Object3D';
    import { Matrix4 } from 'three/math/Matrix4';
    import { _Math } from 'three/math/Math';

    const THREE = {
      Object3D,
      Matrix4,
      Math: _Math,
    };

    ${content}

    const CSS3DObject = THREE.CSS3DObject;
    const CSS3DRenderer = THREE.CSS3DRenderer;
    export { CSS3DObject, CSS3DRenderer };
  `;
};
