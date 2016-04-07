---
layout: home
---

Talisman is a JavaScript library collecting series of algorithms related to the three following domains:

* [Fuzzy logic & fuzzy matching](https://en.wikipedia.org/wiki/Approximate_string_matching)
* [Natural Language Processing (NLP)](https://en.wikipedia.org/wiki/Natural_language_processing)
* [Machine learning](https://en.wikipedia.org/wiki/Machine_learning)

## Installation

You can install **Talisman** through npm:

```bash
npm install talisman
```

## List of available modules

<div class="modules-list">
  <ul>
    <li>
      <a href="{{ site.baseurl }}/phonetics">phonetics</a>
      <ul>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#caverphone">caverphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#cologne">cologne</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#doubleMetaphone">doubleMetaphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#metaphone">metaphone</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#mra">mra</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#nysiis">nysiis</a></em></li>
        <li>&middot; <em><a href="{{ site.baseurl }}/phonetics#soundex">soundex</a></em></li>
      </ul>
    </li>
  </ul>
</div>

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
