module.exports = function boilerplateLoader(content) {
  if (this.cacheable) this.cacheable();
  return `
  
    ${content}

    export { WebVRManager };
  `;
};
