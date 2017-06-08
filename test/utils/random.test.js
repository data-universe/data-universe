const assert = require('assert');
const RND = require('../src/utils/random.js');

describe('Test random module', () => {
  it('should be able to be equal to 1', () => {
    assert.equal(1, RND.randomPick([1]));
  });

  it('should not be able to be equal to 10', () => {
    assert.notEqual(10, RND.randomInt(0, 9));
  });
});
