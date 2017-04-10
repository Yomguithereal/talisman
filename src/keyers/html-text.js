/**
 * Talisman keyers/html-text
 * ==========================
 *
 * Function extracting raw text from HTML representation.
 */
// import {AllHtmlEntities} from 'html-entities';

// const ENTITIES = new AllHtmlEntities();

/**
 * State constants.
 */
const STATE_TEXT = 0,
      STATE_HTML = 1,
      STATE_TAG_NAME = 2;
      // STATE_COMMENT = 3,
      // STATE_SCRIPT = 4,
      // STATE_STYLE = 5,
      // STATE_CDATA = 6,
      // STATE_DOCTYPE = 7;

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

        else if (!tagName) {
          if (!TAG_START.test(char)) {
            state = STATE_TEXT;
            output += buffer + char;
            buffer = '';
          }
          else {
            tagName = char;
          }
        }
        else {
          if (!TAG_SPACE.test(char)) {
            tagName += char;
          }
          else {

            // TODO: here we know the full tagName
            state = char === '>' ? STATE_TEXT : STATE_HTML;
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
    }

    return output;
  };
}

export default createKeyer();

// TODO: handle entities
// TODO: clean JS
// TODO: clean style
// TODO: CDATA
// TODO: handle <br>, <hr> etc.
// TODO: handle self closing
// TODO: handle doctype
// TODO: innerText && textContent
