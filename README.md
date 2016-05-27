[![Build Status](https://travis-ci.org/Yomguithereal/talisman.svg)](https://travis-ci.org/Yomguithereal/talisman)

# Talisman

[Full documentation](http://yomguithereal.github.io/talisman/)

Talisman is a JavaScript library collecting series of algorithms related to the following domains:

* [Statistics](https://en.wikipedia.org/wiki/Statistics)
* [Fuzzy logic & fuzzy matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing)
* [Machine learning](https://en.wikipedia.org/wiki/Machine_learning)

## Installation

You can install **Talisman** through npm:

```bash
npm install talisman
```

## Documentation

The library's full documentation can be found [here](http://yomguithereal.github.io/talisman/).

## Goals

* :package: **Modular**: the library is completely modular. This means that if you only need to compute a `levenshtein` distance, you will only load the relevant code.
* :bulb: **Straightfoward & simple**: just want to compute a jaccard index? No need to instantiate a class and use two methods to pass options and then finally succeed in getting the index. Just apply the `jaccard` function and get going.
* :dango: **Consistent API**: the library's API is fully consistent and one should not struggle to understand how to apply two different distance metrics.
* :postal_horn: **Functional**: except for cases where classes might be useful (classifiers notably), *Talisman* only uses functions, consumes raw data and order functions' arguments to make partial application & currying etc. as easy as possible.
* :zap: **Performant**: the library should be as performant as possible for a high-level programming language library.
* :globe_with_meridians: **Cross-platform**: the library is cross-platform and can be used both with node.js and in the browser.

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

[MIT](./LICENSE.txt)
