# Changelog

## 1.1.4

* Fixing `phonetics/nysiis`.

## 1.1.3

* Initial JOSS release.

## 1.1.2

* Fixing `phonetics/french/sonnex` (@tuzepoito).
* Fixing `keyers/name-sig`.

## 1.1.1

* Dropping `.babelrc` from npm package file to avoid bundling issues.

## 1.1.0

* Adding the `tokenizers/words/gersam` namespace.

## 1.0.0

* Dropping some namespaces & consolidating a stable release.

## 0.21.0

* Exposing Punkt Trainer's configuration options.

## 0.20.0

* Adding the `keyers/name-sig` namespace.
* Adding the `metrics/distance/lig` namespace.
* Adding the `phonetics/sound-d` namespace.
* Fixing `keyers/omission` & `keyers/skeleton` and better unit tests.

## 0.19.1

* Improving `tokenizers/sentences/naive`.
* Dropping `generatorics` in favor of [obliterator](https://github.com/Yomguithereal/obliterator).

## 0.19.0

* Adding the `clustering/record-linkage/leader` namespace.
* Adding the `keyers/name-power-set` namespace.
* Adding the `keyers/normalize` namespace.
* Adding the `tokenizers/fingerprint/name` namespace.
* Adding the `tokenizers/skipgrams` namespace.
* Fixing & optimizing `clustering/k-means`.
* Dropping the `helpers/random` namespace in favor of [pandemonium](https://github.com/Yomguithereal/pandemonium).

## 0.18.0

* Adding the `metrics/distance/guth` namespace.
* Fixing a bug related to Levenshtein distance prefix trimming.
* Fixing a bug related to `clustering/k-means`.

## 0.17.0

* Fixing `metrics/distance/jaro-winkler`.
* Improving `metrics/distance/overlap` performance.
* Dropping the `structures` namespace in favor of [mnemonist](https://github.com/Yomguithereal/mnemonist).

## 0.16.0

* Changing the way the fingerprint API.
* Providing index of item in some `clustering/record-linkage` callbacks.
* Adding `merge` option to `clustering/record-linkage/key-collision`.
* Adding the `keyers/fingerprint` namespace back.
* Moving `phonetics/omission` & `phonetics/skeleton` back to the `keyers` namespace.
* Improving `metrics/distance/levenshtein` performance.

## 0.15.0

* Adding the `hash/crc32` namespace.
* Adding the `hash/minhash` namespace.
* Adding the `helpers/random#createRandomIndex` function.
* Adding the `helpers/random#createChoice` function.
* Adding the `helpers/random#createDangerousButPerformantSample` function.
* Adding the `helpers/random#createSuffleInPlace` function.
* Adding the `clustering/record-linkage/blocking` namespace.
* Adding the `clustering/record-linkage/canopy` namespace.
* Adding the `distance/metrics/bag` namespace.
* Adding the `distance/metrics/lcs` namespace.
* Adding the `distance/metrics/length` namespace.
* Adding the `distance/metrics/minhash` namespace.
* Adding the `distance/metrics/mlipns` namespace.
* Adding the `distance/metrics/prefix` namespace.
* Adding the `distance/metrics/ratcliff-obershelp` namespace.
* Adding the `distance/metrics/sift4` namespace.
* Adding the `distance/metrics/smith-waterman` namespace.
* Adding the `distance/metrics/suffix` namespace.
* Adding the `phonetics/french/fonem` namespace.
* Adding the `regexp` namespace.
* Adding the `stemmers/french/carry` namespace.
* Adding the `stemmers/french/eda` namespace.
* Adding the `tokenizers/fingerprint` namespace.
* Adding the `asymmetric` option to `clustering/naive`.
* Adding the `minClusterSize` option to clusterers.
* Adding limited version of `metrics/distance/damerau-levenshtein`.
* Adding limited version of `metrics/distance/levenshtein`.
* Adding bitwise version of `metrics/distance/hamming`.
* Adding normalized version of `metrics/distance/hamming`.
* Moving `stats/ngrams` to `tokenizers/ngrams`.
* Moving `keyers/omission` to `phonetics/omission`.
* Moving `keyers/skeleton` to `phonetics/skeleton`.
* Moving similarity clusterers to the `clustering/record-linkage` namespace.
* Dropping the `stats/tfidf` namespace.
* Dropping the `keyers` namespace.

## 0.14.0

* Dropping the `phonetics/spanish/fonetico` namespace (should use [phonogram](https://github.com/Yomguithereal/phonogram) now).
* Improving `VPTree` performance by building the tree iteratively.
* Found a way to ease CommonJS by getting rid of pesky `.default`.

## 0.13.0

* Adding the `clustering/key-collision` namespace.
* Adding the `clustering/naive` namespace.
* Adding the `clustering/sorted-neighborhood` namespace.
* Adding the `clustering/vp-tree` namespace.
* Adding the `metrics/distance/identity` namespace.
* Adding the `metrics/distance/monge-elkan` namespace.
* Reversing `structures/bk-tree#search` arguments.

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
