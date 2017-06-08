const THREE = require('three');
const assert = require('assert');
const RND = require('../src/utils/random.js');


describe('Basic test file', () => {


  it('should have a defined BasicShadowMap constant', () => {
    assert.notEqual('undefined', THREE.BasicShadowMap);
  });


  it('should be able to construct a Vector3 with default of x=0', () => {
    const vec3 = new THREE.Vector3();
    assert.equal(0, vec3.x);
  });

  it('should not be able to be equal to 10', () => {
    assert.notEqual(10, RND.randomInt(0, 9));
  });
})
