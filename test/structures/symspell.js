/**
 * Talisman structure/symspell tests
 * ==================================
 */
import assert from 'assert';
import SymSpell from '../../src/structures/symspell';

describe.only('symspell', function() {
  const test = new SymSpell();

  test.add('Hello');
  test.add('Mello');
  test.add('John');
  test.add('Book');
  test.add('Back');
  test.add('World');
  test.add('Hello');
  test.add('Jello');
  test.add('Hell');
  test.add('Trello');

  console.log(test);
});
