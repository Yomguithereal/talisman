/**
 * Talisman metrics/distance/monge-elkan tests
 * ============================================
 *
 */
import assert from 'assert';
import mongeElkan, {symmetric} from '../../../src/metrics/distance/monge-elkan';
import {similarity as identity} from '../../../src/metrics/distance/identity';

describe('monge-elkan', function() {

  it('should properly compute Monge-Elkan distance.', function() {

    assert.strictEqual(
      mongeElkan(identity, ['test'], ['test', 'test2']),
      1
    );

    assert.strictEqual(
      symmetric(identity, ['test', 'test2'], ['test']),
      0.75
    );

    const tests = [
      ['test string1', 'test string2', 0.5],
      ['test', 'test string2', 0.75],
      ['', 'test string2', 0],
      ['aaa bbb ccc ddd', 'aaa bbb ccc eee', 0.75],
      ['a b c d', 'a b c e', 0.75],
      ['Sam J Chapman', 'Samuel John Chapman', 1 / 3],
      ['Sam Chapman', 'S Chapman', 0.5],
      ['John Smith', 'Samuel John Chapman', 0.41666666666666663],
      ['John Smith', 'Sam Chapman', 0],
      ['John Smith', 'Sam J Chapman', 0],
      ['John Smith', 'S Chapman', 0],
      ['', '', 1],
      ['test', 'test', 1]
    ];

    tests.forEach(function([a, b, s]) {
      assert.strictEqual(
        symmetric(
          identity,
          a.split(' '),
          b.split(' ')
        ),
        s,
        `${a} <=> ${b} (${s})`
      );
    });
  });
});
