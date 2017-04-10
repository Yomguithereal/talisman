/**
 * Talisman keyers/html-text
 * ==========================
 *
 * Function extracting raw text from HTML representation.
 */
import {AllHtmlEntities} from 'html-entities';

const ENTITIES = new AllHtmlEntities();

/**
 * State constants.
 */
const STATE_TEXT = 0,
      STATE_HTML = 1,
      STATE_TAG_NAME = 2,
      STATE_COMMENT = 3,
      STATE_SKIP = 4;

/**
 * Regexes.
 */
const TAG_START = /[A-Za-z_]/,
      TAG_SPACE = /[\s>]/;

/**
 * Function creating a html to text keyer.
 *
 * @return {function}
 */
export function createKeyer() {

  /**
   * Function taking a HTML string and returning raw text.
   *
   * @param  {string} html - Input HTML string.
   * @return {string}
   */
  return function htmlText(html) {
    let state = STATE_TEXT,
        tagName = '',
        buffer = '',
        output = '';

    let quotes = '',
        char,
        i,
        l;

    for (i = 0, l = html.length; i < l; i++) {
      char = html[i];

      // In raw text
      if (state === STATE_TEXT) {
        if (char === '<') {
          state = STATE_TAG_NAME;
          buffer = char;
        }
        else {
          output += char;
        }
      }

      // Building tag name
      else if (state === STATE_TAG_NAME) {

        // Closing tag
        if (char === '/') {
          state = STATE_HTML;
        }

        // Comments
        else if (char === '!' && html[i + 1] === '-' && html[i + 2] === '-') {
          state = STATE_COMMENT;
          i += 2;
          buffer = '';
        }

        else if (!tagName) {
          if (!TAG_START.test(char)) {
            state = STATE_TEXT;
            output += buffer + char;
            buffer = '';
          }
          else {
            tagName = char.toLowerCase();
          }
        }
        else {
          if (!TAG_SPACE.test(char)) {
            tagName += char.toLowerCase();
          }
          else {

            if (tagName === 'script' || tagName === 'style') {
              state = STATE_SKIP;
            }
            else {
              state = char === '>' ? STATE_TEXT : STATE_HTML;
            }
          }
        }
      }

      // In HTML
      else if (state === STATE_HTML) {

        // Entering quotes
        if (char === '"' || char === '\'') {
          if (!quotes)
            quotes = quotes || char;
          else
            quotes = '';
        }

        // Closing tag
        else if (!quotes && char === '>') {
          state = STATE_TEXT;
          tagName = '';
        }
      }

      // In comments
      else if (state === STATE_COMMENT) {
        if (buffer === '--' && char === '>') {
          state = STATE_TEXT;
        }
        else {
          if (buffer.length === 2)
            buffer = buffer[1];
          buffer += char;
        }
      }
    }

    return ENTITIES.decode(output);
  };
}

export default createKeyer();

// TODO: clean JS
// TODO: clean style
// TODO: CDATA
// TODO: handle <br>, <hr> etc.
// TODO: handle doctype & DTD declaration
// TODO: handle xml declaration
// TODO: innerText && textContent
