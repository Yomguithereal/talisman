---
title: 'Talisman: a JavaScript archive of fuzzy matching, information retrieval and record linkage building blocks'
tags:
  - javascript
  - fuzzy matching
  - natural language processing
  - phonetic algorithms
  - stemmers
  - inflectors
  - deduplication
  - record linkage
  - entity resolution
  - similarity metrics
  - information retrieval
  - search engines
  - tokenizers
authors:
  - name: Guillaume Plique
    orcid: 0000-0003-4916-8472
    affiliation: 1
affiliations:
 - name: médialab, SciencesPo Paris
   index: 1
date: 11 June 2020
bibliography: paper.bib
---

# Summary

Information retrieval [@manning2008introduction; @baeza1999modern] and record linkage [@fellegi1969theory; @christen_data_2012; @herzog_data_2007] have always relied on crafty and heuristical routines aimed at implementing what is often called *fuzzy matching*. Indeed, even if fuzzy logic feels natural to humans, one needs to find various strategies to coerce computers into acknowledging that strings, for instance, are not always strictly delimited. But if some of those techniques, such as the Soundex phonetic algorithm [@odell1956profit] invented at the beginning of the 20th century, are still well known and used, a lot of them were unfortunately lost to time.

As such, the **Talisman** JavaScript library aims at being an archive of a wide variety of techniques that have been used throughout computer sciences' history to perform fuzzy comparisons between words, names, sentences etc. Thus, even if **Talisman** obviously provides state-of-the-art functions that are still being used in an industrial context, it also aims at being a safe harbor for less known or clunkier techniques, for historical and archival purposes.

The library therefore compiles a large array of implementations of the following techniques:

* **keyers**: functions used to normalize strings in order to drop or simplify artifacts that could impair comparisons.
* **similarity metrics**: functions used to compute a similarity or distance between two strings, such as the Levenshtein distance [@levenshtein1966binary] or the Jaccard similarity [@jaccard1912distribution], etc.
* **phonetic algorithms**: functions aiming at producing a fuzzy phonetical representation of the given strings to enable comparisons such as the *Kölner phonetik* [@postel1969kolner] or the *Metaphone* [@philips1990hanging], etc.
* **stemmers**: functions reducing given strings to a *stem* to ease comparisons of a word's various inflections such as the Porter stemmer [@van1980new], etc.
* **tokenizers**: functions used to cut strings into relevant pieces such as words, sentences etc.

Those building blocks can then be used to perform and improve the following tasks:

* Building more relevant search engines through fuzzy matching and indexing
* Clustering string by similarity
* Record linkage, entity resolution etc.
* Natural language processing

Finally, this library can also be used to perform some benchmarks of those building blocks, wrt. precision, recall etc. of the fuzzy matches, which is seldom done in the literature because of how hard it can be to find comprehensive archives aggregating many phonetic algorithms, stemmers etc.

# Related works

* [abydos](https://github.com/chrislit/abydos): a python library implementing similar utilities.
* [java-string-similarity](https://github.com/tdebatty/java-string-similarity), [stringdistance](https://github.com/vickumar1981/stringdistance): Java libraries implementing string distance/similarity functions.
* [OpenRefine](https://openrefine.org/): a fully-fledged application designed to apply similar methods to typical data cleaning tasks.
* [clj-fuzzy](https://github.com/Yomguithereal/clj-fuzzy): a Clojure library which stands as an earlier version of **Talisman**

# References
