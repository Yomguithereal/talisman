/**
 * Talisman keyers/normalize tests
 * ================================
 */
import assert from 'assert';
import normalize, {createNormalizer} from '../../src/keyers/normalize';

describe('normalize', function() {

  it('should properly normalize the given strings.', function() {
    const tests = [
      ['Hello, World', 'hello, world', 'Hello, World'],
      ['\x00Hello', 'hello', 'Hello'],
      ['    \n   this        \t\t\t  ', 'this'],
      ['  this    space\t', 'this space'],
      ['é Oh', 'e oh', 'e Oh', 'é oh'],
      ['æther', 'aether'],
      ['œuf', 'oeuf'],
      ['Straß', 'strass', 'Strass'],
      ['What now…', 'what now...', 'What now...'],
      ['It’s uncanny!', 'it\'s uncanny!', 'It\'s uncanny!'],
      ['Not      a «problem»      \t \t\n', 'not a "problem"', 'Not a "problem"']
    ];

    const keepCaseNormalizer = createNormalizer({keepCase: true}),
          keepAccentsNormalizer = createNormalizer({keepAccents: true});

    tests.forEach(function([string, normalized, caseIntact, accentsIntact]) {
      if (!caseIntact)
        caseIntact = normalized;

      if (!accentsIntact)
        accentsIntact = normalized;

      assert.strictEqual(normalize(string), normalized, `Normalize: (${string}) => (${normalized})`);
      assert.strictEqual(keepCaseNormalizer(string), caseIntact, `Keep Case: (${string}) => (${caseIntact})`);
      assert.strictEqual(keepAccentsNormalizer(string), accentsIntact, `Keep Accents: (${string}) => (${accentsIntact})`);
    });
  });
});
