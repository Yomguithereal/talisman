/* eslint no-loop-func: 0 */
/**
 * Talisman features/extraction/vectorizers
 * =========================================
 *
 * Compilation of vectorizers aiming at transforming data into
 * feature matrices used by machine learning methods.
 */

/**
 * Vectorizer taking a collection as input and outputting a feature matrix.
 *
 * @param  {object}   options             - Options to customize the output.
 * @param  {function} [options.type]      - Array class to use.
 * @param  {string}   [options.separator] - Separator to use in qualitative
 *                                          headers name.
 * @param  {array}    collection          - The target collection (array of
 *                                          objects).
 * @return {object}                       - An object containing the result
 *                                          (meta, headers & features).
 */
const DEFAULT_COLLECTION_OPTIONS = {
  type: Array,
  separator: '='
};

export function collectionVectorizer(options, collection) {
  options = options || {};

  const ArrayClass = options.type || DEFAULT_COLLECTION_OPTIONS.type,
        separator = options.separator || DEFAULT_COLLECTION_OPTIONS.separator;

  // Doing a first pass to assess the content of the collection
  const fields = {};

  for (let i = 0, l = collection.length; i < l; i++) {
    const item = collection[i];

    // Checking every field
    for (const k in item) {
      const value = item[k],
            quantitative = typeof value === 'number';

      if (!(k in fields)) {
        fields[k] = {
          values: new Set(),
          quantitative
        };
      }

      fields[k].values.add('' + value);
      fields[k].quantitative = fields[k].quantitative && quantitative;
    }
  }

  // Building the meta
  const meta = {},
        quantitativeFields = new Set();

  let length = 0;

  for (const k in fields) {
    const {quantitative, values} = fields[k];

    if (quantitative) {
      meta[k] = {
        index: length++,
        quantitative
      };

      quantitativeFields.add(k);
    }
    else {
      values.forEach(value => {
        meta[`${k}${separator}${value}`] = {
          index: length++,
          quantitative
        };
      });
    }
  }

  // Building the features matrix
  const features = new Array(collection.length);

  for (let i = 0, l = collection.length; i < l; i++) {
    const item = collection[i];

    features[i] = new ArrayClass(length);

    for (const k in item) {
      const value = item[k],
            quantitative = quantitativeFields.has(k),
            h = quantitative ? k : `${k}${separator}${value}`,
            index = meta[h].index;

      features[i][index] = quantitative ? value : 1;
    }
  }

  // Building the headers
  const headers = Object.keys(meta).map(k => k);

  return {
    headers,
    meta,
    features
  };
}

/**
 * Vectorizer taking a list of tokenized documents as input and outputting a
 * "bag of words" features matrix.
 *
 * @param  {object}   options             - Options to customize the output.
 * @param  {function} [options.type]      - Array class to use.
 * @param  {array}    documents           - The documents to process.
 * @return {object}                       - An object containing the result
 *                                          (meta, headers & features).
 */
const DEFAULT_TEXT_OPTIONS = {
  type: Array
};

export function bagOfWordsVectorizer(options, documents) {
  options = options || {};

  const ArrayClass = options.type || DEFAULT_TEXT_OPTIONS.type;

  // Iterating through documents to gather every word
  const words = {};
  let index = 0;

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i];

    for (let j = 0, m = doc.length; j < m; j++) {
      if (!(doc[j] in words))
        words[doc[j]] = index++;
    }
  }

  // Building headers & features matrix
  const headers = Object.keys(words),
        features = new Array(documents.length);

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i];

    features[i] = new ArrayClass(headers.length);

    for (let j = 0, m = doc.length; j < m; j++)
      features[i][words[doc[j]]] = 1;
  }

  return {
    headers,
    features
  };
}

/**
 * Vectorizer taking a list of tokenized documents as input and outputting a
 * features matrix containing the count of each word in the document.
 *
 * @param  {object}   options             - Options to customize the output.
 * @param  {function} [options.type]      - Array class to use.
 * @param  {array}    documents           - The documents to process.
 * @return {object}                       - An object containing the result
 *                                          (meta, headers & features).
 */
export function countVectorizer(options, documents) {
  options = options || {};

  const ArrayClass = options.type || DEFAULT_TEXT_OPTIONS.type;

  // Iterating through documents to gather every word
  const words = {};
  let index = 0;

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i];

    for (let j = 0, m = doc.length; j < m; j++) {
      if (!(doc[j] in words))
        words[doc[j]] = index++;
    }
  }

  // Building headers & features matrix
  const headers = Object.keys(words),
        features = new Array(documents.length);

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i];

    features[i] = new ArrayClass(headers.length);

    for (let j = 0, m = doc.length; j < m; j++) {
      const k = words[doc[j]];
      features[i][k] = features[i][k] || 0;
      features[i][k]++;
    }
  }

  return {
    headers,
    features
  };
}

/**
 * Vectorizer taking a list of tokenized documents as input and outputting a
 * features matrix containing the tfidf metric for each word in the document.
 *
 * @param  {object}   options             - Options to customize the output.
 * @param  {function} [options.type]      - Array class to use.
 * @param  {array}    documents           - The documents to process.
 * @return {object}                       - An object containing the result
 *                                          (meta, headers & features).
 */
export function tfidfVectorizer(options, documents) {
  options = options || {};

  const ArrayClass = options.type || DEFAULT_TEXT_OPTIONS.type;

  // Iterating through documents to gather every word
  const words = {},
        termFrequencies = [];

  let index = 0;

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i];

    termFrequencies.push({});

    for (let j = 0, m = doc.length; j < m; j++) {
      const word = doc[j];

      if (!(word in words))
        words[word] = {
          index: index++,
          idf: 0
        };

      words[word].idf++;

      termFrequencies[i][word] = termFrequencies[i][word] || 0;
      termFrequencies[i][word]++;
    }
  }

  // Computing inverse document frequencies
  for (const word in words)
    words[word].idf = Math.log(documents.length / words[word].idf);

  // Building headers & features matrix
  const headers = Object.keys(words),
        features = new Array(documents.length);

  for (let i = 0, l = documents.length; i < l; i++) {
    const doc = documents[i],
          tfs = termFrequencies[i];

    features[i] = new ArrayClass(headers.length);

    for (let j = 0, m = doc.length; j < m; j++) {
      const {index: k, idf} = words[doc[j]];
      features[i][k] = tfs[doc[j]] * idf;
    }
  }

  return {
    headers,
    features
  };
}
