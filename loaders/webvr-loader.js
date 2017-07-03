module.exports = function threeLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
    import { VREffect } from 'three_examples/effects/VREffect';
    const THREE = {
      VREffect,
    };

    ${content}

    const WebVR = WEBVR;
    export { WebVR };
  `;
};
