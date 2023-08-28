import {describe, it, test} from 'mocha';

const expect = require('chai').expect;

describe('Sample Unit Test Title', () => {
  test('Example of test case', () => {
    it('should return 2', () => {
      expect(1 + 1).to.equal(2);
    });
  });
});
