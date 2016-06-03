/**
 * Talisman stemmers/german/caumanns tests
 * ========================================
 *
 */
import assert from 'assert';
import caumanns from '../../../src/stemmers/german/caumanns';

describe('caumanns', function() {
  it('should correctly stem the given words.', function() {
    const tests = [
      ['', ''],
      ['lesen', 'les'],
      ['graues', 'grau'],
      ['buchstabieren', 'buchstabier'],
      ['singt', 'sing'],
      ['singen', 'sing'],
      ['beliebt', 'belieb'],
      ['beliebtester', 'belieb'],
      ['stören', 'stor'],
      ['stöhnen', 'stoh'],
      ['Kuß', 'kuss'],
      ['Küsse', 'kuss'],
      ['Verlierer', 'verlier'],
      ['Verlies', 'verlie'],
      ['Maus', 'mau'],
      ['Mauer', 'mau'],
      ['Störsender', 'stor'],
      ['Müllerinnen', 'mullerin'],
      ['Matrix', 'matrix'],
      ['Matrizen', 'matrix'],
      ['häufig', 'haufig'],
      ['üor', 'uor'],
      ['björk', 'bjork'],
      ['abschließen', 'abschliess'],
      ['abschließender', 'abschliess'],
      ['abschließendes', 'abschliess'],
      ['abschließenden', 'abschliess'],
      ['Tisch', 'tisch'],
      ['Tische', 'tisch'],
      ['Tischen', 'tisch'],
      ['geheimtür', 'geheimtur'],
      ['Haus', 'hau'],
      ['Hauses', 'hau'],
      ['Häuser', 'hau'],
      ['Häusern', 'hau'],
      ['hauen', 'hau'],
      ['Drama', 'drama'],
      ['Dramen', 'dram'],
      ['Ausmaß', 'ausmass'],
      ['xxxxxe', 'xxxxx'],
      ['xxxxxs', 'xxxxx'],
      ['xxxxxn', 'xxxxx'],
      ['xxxxxt', 'xxxxx'],
      ['xxxxxem', 'xxxxx'],
      ['xxxxxer', 'xxxxx'],
      ['xxxxxnd', 'xxxxx'],
      ['xxxxxetende', 'xxxxx'],
      ['xxe', 'xxe'],
      ['xxem', 'xxem'],
      ['xxer', 'xxer'],
      ['xxxnd', 'xxxnd']
    ];

    tests.forEach(function([word, stem]) {
      assert.strictEqual(caumanns(word), stem);
    });
  });
});
