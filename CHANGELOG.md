# Changelog

## 0.12.0

* Adding the `helpers/random` namespace.
* Adding the `inflectors/spanish/noun` namespace.
* Adding the `keyers/fingerprint` namespace.
* Adding the `keyers/ngram-fingerprint` namespace.
* Adding the `keyers/omission` namespace.
* Adding the `keyers/skeleton` namespace.
* Adding the `tag/averaged-perceptron` namespace.
* Adding the `parsers/brown` namespace.
* Adding the `parsers/conll` namespace.
* Adding the `phonetics/onca` namespace.
* Adding the `stemmers/spanish/unine` namespace.
* Adding the `structures/bk-tree` namespace.
* Adding the `structures/symspell` namespace.
* Adding the `structures/vp-tree` namespace.
* Adding the `sampler` options to `clustering/k-means`.
* Adding the `stats/descriptive#.quantile` function.
* Adding the `stats/descriptive#.median` function.
* Fixing a bug with `clustering/k-means` where k would be superior to the number of vectors.
* Fixing a bug with `clustering/k-means` `initialCentroids` options.
* Fixing a bug with `clustering/k-means` where a vector could end up in several clusters.
* Dropping the internal `regex/classes` namespace.
* Dropping the `hasher` option of the `ngrams` functions.
* Dropping the `set-functions` dependency.

## 0.11.0

* Improving `clustering/k-means` API.
* Improving `tokenizers/syllable/sonoripy` hierarchy definition.

## 0.10.0

* Adding the `metrics/distance/eudex` namespace.
* Adding the `phonetics/eudex` namespace.
* Adding the `tokenizers/syllables/sonoripy` namespace.
* Adding some import shortcuts for naives tokenizers.
* Improving the `tokenizers/syllables/legalipy` API.
* Improving the `tokenizers/sentences/naive` API.
* Fixing `tokenizers/syllables/legalipy` to correctly handle capitalized words.

## 0.9.0

* Adding the `phonetics/alpha-sis` namespace.
* Adding the `phonetics/fuzzy-soundex` namespace.
* Adding the `phonetics/phonex` namespace.
* Adding the `stemmers/uea-lite` namespace.
* Adding the `stats/inferential#sampleCovariance` function.
* Adding the `stats/inferential#sampleCorrelation` function.
* Moving the `metrics` namespace to `metrics/distance`.

## 0.8.0

* Adding the `stemmers/s-stemmer` namespace.
* Adding the `tokenizers/hyphenation/liang` namespace.
* Adding the `tokenizers/lines/naive` namespace.
* Adding the `tokenizers/paragraphs/naive` namespace.
* Adding the `tokenizers/syllables/legalipy` namespace.
* Adding the `tokenizers/tweets/casual` namespace.
* Adding the `stats/frequencies#updateFrequencies` function.
* Adding polymorphism to the `stats/frequencies#relative` function.

## 0.7.0

* Adding the `features/extraction/vectorizer` namespace.
* Adding the `phonetics/lein` namespace.
* Adding the `phonetics/roger-root` namespace.
* Adding the `phonetics/statcan` namespace.

## 0.6.0

* Adding the `stemmers/french/unine` namespace.

## 0.5.0

* Adding the `phonetics/german/phonem` namespace.
* Adding the `phonetics/spanish/fonetico` namespace.
* Adding the `stemmers/german/caumanns` namespace.

## 0.4.0

* Adding the `phonetics/french/phonetic` namespace.
* Adding the `phonetics/french/phonex` namespace.
* Adding the `phonetics/french/sonnex` namespace.
* Adding the `phonetics/french/soundex` namespace.
* Adding the `phonetics/french/soundex2` namespace.
* Adding the `stemmers/french/porter` namespace.
* Adding the `tokenizers/sentences/punkt` namespace.
* Moving the Cologne phonetic algorithm to the `phonetics/german/cologne` namespace.

## 0.3.0

* Adding the `classification/naive-bayes` namespace.
* Adding the `classification/perceptron` namespace.
* Adding the `metrics/damerau-levenshtein` namespace.
* Adding the `stats/descriptive` namespace.
* Adding the `stats/inferential` namespace.
* Improving `metrics/levenshtein` performance.
* Fixing a bug with `stemmers/porter`.

## 0.2.0

* Adding `phonetics/daitch-mokotoff`.
* Adding `metrics/canberra`.
* Adding `metrics/chebyshev`.
* Adding `metrics/minkowski`.
* Adding the refined version of the Soundex.
* Changing `phonetics/doubleMetaphone` to `phonetics/double-metaphone`.

## 0.1.0

* Adding `stemmers/latin/schinke`.

## 0.0.1

* Initial release.
