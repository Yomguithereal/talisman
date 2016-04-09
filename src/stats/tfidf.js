/**
 * Talisman stats/tfidf
 * =====================
 *
 * Helpers related to TF/IDF computations.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Tf%E2%80%93idf
 */
import {relative as frequencies} from './frequencies';
import words from '../tokenizers/words/naive';

/**
 * TfIdf class
 *
 * @constructor
 * @param {array} docs - Initial documents.
 */
export class TfIdf {
  constructor() {

    // Properties
    this.docs = {};
  }

  /**
   * Adding a document to the corpus.
   *
   * @param  {string}        name - Name of the document to add.
   * @param  {array|string}  doc  - The document to add.
   * @return {TfIdf}              - Returns itself for chaining purposes.
   */
  addDocument(name, doc) {

    // If the document's body is passed as a string, we tokenize it naively
    if (typeof doc === 'string')
      doc = words(doc);

    // Computing frequencies
    const docFrequencies = frequencies(doc);

    // Storing the document
    this.docs[name] = docFrequencies;

    return this;
  }

  /**
   * Retrieving the Term Frequency of a term in a document.
   *
   * @param  {string}        term   - Term.
   * @param  {string}        [name] - Optional document to poll.
   * @return {object|number}        - Returns the tf or an index of tf per doc.
   */
  tf(term, name) {
    if (name) {
      const doc = this.docs[name];

      if (!doc)
        throw Error(`talisman/stats/tfidf.tf: the "${name}" doesn't exist.`);

      return doc[term] || 0;
    }

    const tfIndex = {};

    for (const k in this.docs)
      tfIndex[k] = this.docs[k][term] || 0;

    return tfIndex;
  }

  /**
   * Retrieving the Inverse Document Frequency of a term in the corpus.
   *
   * @param  {string} term   - Term.
   * @return {number}        - Returns the idf of the term.
   */
  idf(term) {
    const docs = Object.keys(this.docs);

    if (!docs.length)
      return 0;

    // First, we need to count the documents having the term
    let matchingDocs = 0;
    for (let i = 0, l = docs.length; i < l; i++) {
      if (this.docs[docs[i]][term])
        matchingDocs++;
    }

    if (!matchingDocs)
      return 0;

    return Math.log(docs.length / matchingDocs);
  }

  /**
   * Retrieving the TF-IDF of a term in the corpus.
   *
   * @param  {string}        term   - Term.
   * @param  {string}        [name] - Optional document to poll.
   * @return {object|number}        - Returns the tf or an index of tf per doc.
   */
  tfidf(term, name) {
    if (name) {
      const tf = this.tf(term, name),
            idf = this.idf(term);

      return tf * idf;
    }

    const tfidfIndex = {};

    for (const k in this.docs)
      tfidfIndex[k] = this.tfidf(term, k);

    return tfidfIndex;
  }
}
