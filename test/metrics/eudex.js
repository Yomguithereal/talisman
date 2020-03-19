/**
 * Talisman metrics/distance/eudex tests
 * =========================================
 *
 */
import assert from 'assert';
import {distance, isSimilar} from '../../src/metrics/eudex';

describe('eudex', function() {
  it('should compute distances correctly.', function() {
    assert.strictEqual(distance('jumpo', 'jumbo'), 2);
    assert.strictEqual(distance('jumpo', 'trol'), 408);

    assert(distance('lizzard', 'wizzard') > distance('rick', 'rolled'));
    assert(distance('bannana', 'panana') >= distance('apple', 'abple'));
    assert(distance('trump', 'drumpf') < distance('gangam', 'style'));
  });

  it('distance reflexivity.', function() {
    const pairs = [
      ['a', 'b'],
      ['youtube', 'facebook'],
      ['Rust', 'Go'],
      ['rick', 'rolled']
    ];

    pairs.forEach(function([one, two]) {
      assert.strictEqual(distance(one, two), distance(two, one));
    });
  });

  it('similarity function should work correctly.', function() {

    const similar = [
      ['yay', 'yuy'],
      ['what', 'wat'],
      ['jesus', 'jeuses'],
      ['', ''],
      ['lol', 'lulz'],
      ['maier', 'meyer'],
      ['möier', 'meyer'],
      ['fümlaut', 'fymlaut']
    ];

    similar.forEach(function([one, two]) {
      assert(isSimilar(one, two), `${one} =~ ${two}`);
    });

    const different = [
      ['youtube', 'reddit'],
      ['yet', 'vet'],
      ['hacker', '4chan'],
      ['awesome', 'me'],
      ['prisco', 'vkisco'],
      ['no', 'go'],
      ['horse', 'norse'],
      ['nice', 'mice']
    ];

    different.forEach(function([one, two]) {
      assert(!isSimilar(one, two), `${one} =~ ${two}`);
    });
  });
});
