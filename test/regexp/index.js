/**
 * Talisman regexp tests
 * ======================
 *
 */
import assert from 'assert';
import {
  createFuzzyPattern,
  escapeRegexp
} from '../../src/regexp';

describe('regexp', function() {

  describe('#.escapeRegexp', function() {

    it('should correctly escape strings.', function() {
      assert.strictEqual(escapeRegexp('[]'), '\\[\\]');
    });
  });

  describe('#.createFuzzyPattern', function() {

    it('should create the expected pattern.', function() {
      assert.strictEqual(createFuzzyPattern('ajs'), '(a).*?(j).*?(s)');
    });
  });
});
