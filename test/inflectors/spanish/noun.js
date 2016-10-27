/**
 * Talisman inflectors/spanish/noun
 * =================================
 */
import assert from 'assert';
import {singularize} from '../../../src/inflectors/spanish/noun';

describe('noun', function() {

  describe('#.singularize', function() {

    it('should correclty singularize Spanish words.', function() {

      const tests = [
        ['álbumes', 'álbum'],
        ['almacenes', 'almacén'],
        ['androides', 'androide'],
        ['antifaces', 'antifaz'],
        ['árboles', 'árbol'],
        ['atlas', 'atlas'],
        ['autobuses', 'autobús'],
        ['bases', 'base'],
        ['bebés', 'bebé'],
        ['camiones', 'camión'],
        ['casas', 'casa'],
        ['ceutíes', 'ceutí'],
        ['chimpancés', 'chimpancé'],
        ['clanes', 'clan'],
        ['compases', 'compás'],
        ['convoyes', 'convoy'],
        ['coxis', 'coxis'],
        ['crisis', 'crisis'],
        ['déficits', 'déficit'],
        ['ejes', 'eje'],
        ['espíritus', 'espíritu'],
        ['flashes', 'flash'],
        ['fracs', 'frac'],
        ['gafas', 'gafas'],
        ['hipótesis', 'hipótesis'],
        ['ingleses', 'inglés'],
        ['lápices', 'lápiz'],
        ['luces', 'luz'],
        ['montajes', 'montaje'],
        ['noes', 'no'],
        ['otitis', 'otitis'],
        ['padres', 'padre'],
        ['países', 'país'],
        ['papás', 'papá'],
        ['parkings', 'parking'],
        ['portaequipajes', 'portaequipaje'],
        ['radiocasetes', 'radiocasete'],
        ['shows', 'show'],
        ['sis', 'si'],
        ['síes', 'sí'],
        ['tabúes', 'tabú'],
        ['tamices', 'tamiz'],
        ['tanques', 'tanque'],
        ['taxis', 'taxi'],
        ['tijeras', 'tijeras'],
        ['trenes', 'tren'],
        ['virus', 'virus'],
        ['Trenes', 'Tren'],
        ['trEnes', 'trEn']
      ];

      tests.forEach(function([plural, singular]) {
        assert.strictEqual(singularize(plural), singular);
      });
    });
  });
});
