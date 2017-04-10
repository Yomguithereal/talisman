/**
 * Talisman keyers/html-text tests
 * ================================
 */
import assert from 'assert';
import htmlText from '../../src/keyers/html-text';

// const BASIC_HTML = `
// <div>
//   Hello
//   <p> What are you doing?</p>
//   <a href="link">Link towards something</a>
//   <div>
//     World!
//   </div>
//   <div></div>
// </div>
// `.trim();

describe('html-text', function() {

  it('should properly extract raw text from HTML strings.', function() {
    const tests = [
      ['<a href="test.com">Hello World!</a>', 'Hello World!'],
      ['<div><p>Hello</p><p>World!</p></div>', 'HelloWorld!'],
      // [BASIC_HTML, 'Hello What are you doing?Link towards somethingWorld!']
    ];

    tests.forEach(function([html, text]) {
      assert.strictEqual(htmlText(html), text);
    });
  });
});
