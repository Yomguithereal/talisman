---
layout: home
---

**Talisman** is a JavaScript library collecting series of algorithms related to the following domains:

* [Statistics](https://en.wikipedia.org/wiki/Statistics)
* [Fuzzy logic & fuzzy matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing)
* [Machine learning](https://en.wikipedia.org/wiki/Machine_learning)

## Installation

You can install **Talisman** through npm:

```bash
npm install talisman
```

## Source code

The library's source code can be found on its Github [repository]({{ site.url }}).

## List of available modules

*Top level*

<div>
  <ul>
    <li>
      <a href="{{ site.baseurl }}/clustering">clustering</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/keyers">keyers</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/metrics">metrics</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/phonetics">phonetics</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/stats">stats</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/stemmers">stemmers</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/structures">structures</a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/tokenizers">tokenizers</a>
    </li>
  </ul>
</div>

*Full list*

<div class="modules-list">
  <ul>
    <li id="clustering">
      <a href="{{ site.baseurl }}/clustering">clustering</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/clustering#k-means">k-means</a></em></li>
      </ul>
    </li>
    <li id="keyers">
      <a href="{{ site.baseurl }}/keyers">keyers</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/keyers#fingerprint">fingerprint</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/keyers#ngram-fingerprint">ngram-fingerprint</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/keyers#omission">omission</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/keyers#skeleton">skeleton</a></em></li>
      </ul>
    </li>
    <li id="metrics">
      <a href="{{ site.baseurl }}/metrics">metrics</a>
      <ul>
        <li>
          <a href="{{ site.baseurl }}/metrics/distance">distance</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#canberra">canberra</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#chebyshev">chebyshev</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#cosine">cosine</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#damerau-levenshtein">damerau-levenshtein</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#dice">dice</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#euclidean">euclidean</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#eudex">eudex</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#hamming">hamming</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#jaccard">jaccard</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#jaro">jaro</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#jaro-winkler">jaro-winkler</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#levenshtein">levenshtein</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#manhattan">manhattan</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#minkowski">minkowski</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#mra">mra</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#overlap">overlap</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#sorensen">sorensen</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/metrics/distance#tversky">tversky</a></em></li>
          </ul>
        </li>
      </ul>
    </li>
    <li id="phonetics">
      <a href="{{ site.baseurl }}/phonetics">phonetics</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#alpha-sis">alpha-sis</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#caverphone">caverphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#daitch-mokotoff">daitch-mokotoff</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#double-metaphone">double-metaphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#eudex">eudex</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#fuzzy-soundex">fuzzy-soundex</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#lein">lein</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#metaphone">metaphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#mra">mra</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#nysiis">nysiis</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#onca">onca</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#phonex">phonex</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#roger-root">roger-root</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#soundex">soundex</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#statcan">statcan</a></em></li>
        <li>
          <a href="{{ site.baseurl }}/phonetics/french">french</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/french#phonetic">phonetic</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/french#phonex">phonex</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/french#sonnex">sonnex</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/french#soundex">soundex</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/french#soundex2">soundex2</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/phonetics/german">german</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/german#cologne">cologne</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/phonetics/german#phonem">phonem</a></em></li>
          </ul>
        </li>
      </ul>
    </li>
    <li id="stats">
      <a href="{{ site.baseurl }}/stats">stats</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/stats/descriptive">descriptive</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stats/frequencies">frequencies</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stats/inferential">inferential</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stats/ngrams">ngrams</a></em></li>
      </ul>
    </li>
    <li id="stemmers">
      <a href="{{ site.baseurl }}/stemmers">stemmers</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/stemmers#lancaster">lancaster</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stemmers#lovins">lovins</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stemmers#porter">porter</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stemmers#s-stemmer">s-stemmer</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/stemmers#uea-lite">uea-lite</a></em></li>
        <li>
          <a href="{{ site.baseurl }}/stemmers/french">french</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/stemmers/french#porter">porter</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/stemmers/french#unine">unine</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/stemmers/german">german</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/stemmers/german#caumanns">caumanns</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/stemmers/latin">latin</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/stemmers/latin#schinke">schinke</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/stemmers/spanish">spanish</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/stemmers/spanish#unine">unine</a></em></li>
          </ul>
        </li>
      </ul>
    </li>
    <li id="structures">
      <a href="{{ site.baseurl }}/structures">structures</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/structures/bk-tree">bk-tree</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/structures/symspell">symspell</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/structures/vp-tree">vp-tree</a></em></li>
      </ul>
    </li>
    <li id="tokenizers">
      <a href="{{ site.baseurl }}/tokenizers">tokenizers</a>
      <ul>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/hyphenation">hyphenation</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/hyphenation#liang">liang</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/lines">lines</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/lines#naive">naive</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/paragraphs">paragraphs</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/paragraphs#naive">naive</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/sentences">sentences</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/sentences#naive">naive</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/syllables">syllables</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/syllables#legalipy">legalipy</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/syllables#sonoripy">sonoripy</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/tweets">tweets</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/tweets#casual">casual</a></em></li>
          </ul>
        </li>
        <li>
          <a href="{{ site.baseurl }}/tokenizers/words">words</a>
          <ul>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/words#naive">naive</a></em></li>
            <li>&middot; <em><a href="{{ site.baseurl }}/tokenizers/words#treebank">treebank</a></em></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>

## Goals

* **Modular**: the library is completely modular. This means that if you only need to compute a `levenshtein` distance, you will only load the relevant code.
* **Straightfoward & simple**: just want to compute a jaccard index? No need to instantiate a class and use two methods to pass options and then finally succeed in getting the index. Just apply the `jaccard` function and get going.
* **Consistent API**: the library's API is fully consistent and one should not struggle to understand how to apply two different distance metrics.
* **Functional**: except for cases where classes might be useful (classifiers notably), *Talisman* only uses functions, consumes raw data and order functions' arguments to make partial application & currying etc. as easy as possible.
* **Performant**: the library should be as performant as possible for a high-level programming language library.
* **Cross-platform**: the library is cross-platform and can be used both with node.js and in the browser.

## Changelog

A full list of the changes made by each version of the library is available [here]({{ site.baseurl }}/changelog).

## Contribution

Contributions are of course welcome :)

Be sure to lint & pass the unit tests before submitting your pull request.

```bash
# Cloning the repo
git clone git@github.com:Yomguithereal/talisman.git
cd talisman

# Installing the deps
npm install

# Running the tests
npm test

# Linting the code
npm run lint
```

## License

[MIT]({{ site.url }}/blob/master/LICENSE.txt)
