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
 * @param  {object} options    - Options to customize the output.
 * @param  {array}  collection - The target collection (array of objects).
 * @return {object}            - An object containing headers & the matrix.
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

// Bag of words
// Tfidf
// Count
