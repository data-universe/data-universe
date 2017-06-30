module.exports = function webVRManagerLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
  
    ${content}

    export { WebVRManager };
  `;
};
