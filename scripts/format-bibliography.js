const fs = require('fs');
const Cite = require('citation-js');

const bib = new Cite(fs.readFileSync('./paper/algorithms.bib', 'utf-8'));

let output = bib.format('bibliography', {
  format: 'text',
  template: 'mla',
  lang: 'en-US'
});

output = output
  .trim()
  .split('\n')
  .map(line => {
    return `> ${line}\n`;
  })
  .join('\n');

console.log('# Talisman Bibliography\n');
console.log('[BibTex file](https://raw.githubusercontent.com/Yomguithereal/talisman/master/paper/algorithms.bib)\n');
console.log(output);
