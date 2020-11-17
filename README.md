[![Build Status](https://travis-ci.org/Yomguithereal/talisman.svg)](https://travis-ci.org/Yomguithereal/talisman) [![DOI](https://joss.theoj.org/papers/10.21105/joss.02405/status.svg)](https://doi.org/10.21105/joss.02405)

# Talisman

[Full documentation](https://yomguithereal.github.io/talisman/)

Talisman is a JavaScript library collecting algorithms, functions and various building blocks for [fuzzy matching](https://en.wikipedia.org/wiki/Approximate_string_matching), [information retrieval](https://en.wikipedia.org/wiki/Information_retrieval) and [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing).

## Installation

You can install **Talisman** through npm:

```bash
npm install talisman
```

## Documentation

The library's full documentation can be found [here](https://yomguithereal.github.io/talisman/).

## Bibliography

An extensive bibliography of the methods & functions implemented by the library can be found [here](./BIBLIOGRAPHY.md).

## Goals

* :package: **Modular**: the library is completely modular. This means that if you only need to compute a `levenshtein` distance, you will only load the relevant code.
* :bulb: **Straightforward & simple**: just want to compute a Jaccard index? No need to instantiate a class and use two methods to pass options and then finally succeed in getting the index. Just apply the `jaccard` function and get going.
* :dango: **Consistent API**: the library's API is fully consistent and one should not struggle to understand how to apply two different distance metrics.
* :postal_horn: **Functional**: except for cases where classes might be useful (clustering notably), *Talisman* only uses functions, consumes raw data and order functions' arguments to make partial application & currying etc. as easy as possible.
* :zap: **Performant**: the library should be as performant as possible for a high-level programming language library.
* :globe_with_meridians: **Cross-platform**: the library is cross-platform and can be used both with Node.js and in the browser.

## How to cite

**Talisman** has been published as a [paper](https://joss.theoj.org/papers/10.21105/joss.02405) on the [Journal Of Open Source Software (JOSS)](https://joss.theoj.org/).

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

This project is available as open source under the terms of the [MIT License](./LICENSE.txt).
