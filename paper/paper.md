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

Information retrieval and record linkage have always relied on crafty and heuristical routines aimed at implementing what is often called *fuzzy matching*. Indeed, even if fuzzy logic feels natural to humans, one needs to find various strategies to coerce computers into acknowledging that strings, for instance, are not always strictly delimited. But if some of those techniques, such as the Soundex phonetic algorithm invented by Robert Russell and Margaret King Odell at the beginning of the 20th century, are still well known and used, a lot of them were unfortunately lost to time.

As such, the JavaScript library **Talisman** aims at being an archive of a wide variety of techniques that have been used throughout computer sciences' history to perform fuzzy comparisons between words, names, sentences etc. Thus, even if **Talisman** obviously provides state-of-the-art functions that are still being used in an industrial context, it also aims at being a safe harbor for less known or clunkier techniques, for historical and archival purposes.

The library therefore compiles a large array of implementations of the following techniques:

* **keyers**: functions used to normalize strings in order to drop or simplify artifacts that could impair comparisons.
* **similarity metrics**: functions used to compute a similarity or distance between two strings, such as the Levenshtein distance, for instance.
* **phonetic algorithms**: functions aiming at producing a fuzzy phonetical representation of the given strings to enable comparisons.
* **stemmers**: functions reducing given strings to a *stem* to ease comparisons of a word's various inflections.
* **tokenizers**: functions used to cut strings into relevant pieces such as words, sentences etc.

Those building blocks can then be used to perform and improve the following tasks:

* Building more relevant search engines through fuzzy matching and indexing
* Clustering string by similarity
* Record linkage, entity resolution etc.
* Natural language processing

# References
