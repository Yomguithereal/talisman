/* eslint no-new: 0 */
/**
 * Talisman clustering/record-linkage/abstract tests
 * ==================================================
 *
 */
import assert from 'assert';
import RecordLinkageClusterer from '../../src/clustering/abstract';

describe('abstract', function() {

  it('should throw on invalid arguments.', function() {

    assert.throws(function() {
      new RecordLinkageClusterer(null);
    }, /params/);

    assert.throws(function() {
      new RecordLinkageClusterer({}, null);
    }, /items/);
  });
});
