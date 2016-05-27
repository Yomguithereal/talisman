/**
 * Talisman phonetics/french/phonetic
 * ===================================
 *
 * Implementation of the "phonetic" algorithm for the French language.
 *
 * [Author]: Edouard Bergé
 *
 * [Reference]:
 * http://www.roudoudou.com/phonetic.php
 */
import {squeeze} from '../../helpers';
import deburr from 'lodash/deburr';

// NOTE: ajouter RECUL comme exception
// NOTE: lookahead

/**
 * Rules.
 */
const FIRST_PREPROCESSING = [
  [/O[O]+/g, 'OU'],
  [/SAOU/g, 'SOU'],
  [/OES/g, 'OS'],
  [/CCH/g, 'K'],
  [/CC([IYE])/g, 'KS$1'],
];

const SECOND_PREPROCESSING = [
  [/OIN[GT]$/g, 'OIN'],
  [/E[RS]$/g, 'E'],
  [/(C|CH)OEU/g, 'KE'],
  [/MOEU/g, 'ME'],
  [/OE([UI]+)([BCDFGHJKLMNPQRSTVWXZ])/g, 'E$1$2'],
  [/^GEN[TS]$/, 'JAN'],
  [/CUEI/g, 'KEI'],
  [/([^AEIOUYC])AE([BCDFGHJKLMNPQRSTVWXZ])/g, '$1E$2'],
  [/AE([QS])/g, 'E$1'],
  [/AIE([BCDFGJKLMNPQRSTVWXZ])/g, 'AI$1'],
  [/ANIEM/g, 'ANIM'],
  [/(DRA|TRO|IRO)P$/, '$1'],
  [/(LOM)B$/, '$1'],
  [/(RON|POR)C$/, '$1'],
  [/PECT$/, 'PET'],
  [/ECUL$/, 'CU'],
  [/(CHA|CA|E)M(P|PS)$/, '$1N'],
  [/(TAN|RAN)G$/, '$1']
];

const RULES = [

  // YEUX
  [/([^VO])ILAG/g, '$1IAJ'],
  [/([^TRH])UIL(AR|E)(.+)/g, '$1UI$2$3'],
  [/([G])UIL([AEO])/g, '$1UI$2'],
  [/([NSPM])AIL([AEO])/g, '$1AI$2'],
  [/DIL(AI|ON|ER|EM)/g, 'DI$1'],
  [/RILON/g, 'RION'],
  [/TAILE/g, 'TAIE'],
  [/GAILET/g, 'GAIET'],
  [/AIL(A[IR])/g, 'AI$1'],
  [/OUILA/g, 'OUIA'],
  [/EIL(AI|AR|ER|EM)/g, 'AI$1'],
  [/REILET/g, 'RAIET'],
  [/EILET/g, 'EIET'],
  [/AILOL/g, 'AIOL'],
  [/([^AEIOUY])(SC|S)IEM([EA])/g, '$1$2IAM$3'],
  [/^(SC|S)IEM([EA])/g, '$1IAM$2'],

  // MP/MB -> NP/NB
  [/[OAI]MB/g, '$1NB'],
  [/[OA]MP/g, '$1NP'],
  [/GEMB/g, 'JANB'],
  [/EM([BP])/g, 'AN$1'],
  [/UMBL/g, 'INBL'],
  [/CIEN/g, 'SIAN'],

  // K sounds
  [/^ECEUR/, 'EKEUR'],
  [/^CH(OG+|OL+|OR+|EU+|ARIS|M+|IRO|ONDR)/, 'K$1'],
  [/(YN|RI)CH(OG+|OL+|OC+|OP+|OM+|ARIS|M+|IRO|ONDR)/g, '$1K$2'],
  [/CHS/g, 'CH'],
  [/CH(AIQ)/g, 'K$1'],
  [/^ECHO([^UIPY])/, 'EKO$1'],
  [/ISCH(I|E)/g, 'ISK$1'],
  [/^ICHT/, 'IKT'],
  [/ORCHID/g, 'ORKID'],
  [/ONCHIO/g, 'ONKIO'],
  [/ACHIA/g, 'AKIA'],
  [/([^C])ANICH/g, '$1ANIK'],
  [/OMANIK/g, 'OMANICH'],
  [/ACHY([^D])/g, 'AKI$1'],
  [/([AEIOU])C([BDFGJKLMNPQRTVWXZ])/g, '$1K$2'],
  [/EUCHA/g, 'EKA'],
  [/YCH(IA|A|O|ED)/g, 'IK$1'],
  [/([AR])CHEO/g, '$1KEO'],
  [/RCHES/g, 'RKES'],
  [/ECHN/g, 'EKN'],
  [/OCHTO/g, 'OKTO'],
  [/CHO(RA|NDR|RE)/g, 'KO$1'],
  [/MACHM/g, 'MAKM'],
  [/BRONCHO/g, 'BRONKO'],
  [/LICHO([SC])/g, 'LIKO$1'],

  // WEUH
  [/WA/g, 'OI'],
  [/WO/g, 'O'],
  [/(?:WI|WHI|WHY)/g, 'OUI'],
  [/WHA/g, 'OUA'],
  [/WHO/g, 'OU'],

  // GUEU, GNEU, JEU etc.
  [/GNE([STR])/g, 'NI$1'],
  [/GNE/g, 'NE'],
  [/GI/g, 'JI'],
  [/GNI/g, 'NI'],
  [/GN(A|OU|UR)/g, 'NI$1'],
  [/GY/g, 'JI'],
  [/OUGAIN/g, 'OUGIN'],
  [/AGEO([LT])/g, 'AJO$1'],
  [/GEORG/g, 'JORJ'],
  [/GEO(LO|M|P|G|S|R)/g, 'JEO$1'],
  [/([NU])GEOT/g, '$1JOT'],
  [/GEO([TDC])/g, 'JEO$1'],
  [/GE[OA]/g, 'J$1'],
  [/GE/g, 'JE'],
  [/QU?/g, 'K'],
  [/C[YI]/g, 'SI'],
  [/CN/g, 'KN'],
  [/ICM/g, 'IKM'],
  [/CEAT/g, 'SAT'],
  [/CE/g, 'SE'],
  [/C([RO])/g, 'K$1'],
  [/CUEI/g, 'KEI'],
  [/CU/g, 'KU'],
  [/VENCA/g, 'VANSA'],
  [/C([AS])/g, 'K$1'],
  [/CLEN/g, 'KLAN'],
  [/C([LZ])/g, 'K$1'],
  [/CTIQ/g, 'KTIK'],
  [/CTI[CS]/g, 'KTIS'],
  [/CTI([FL])/g, 'KTI$1'],
  [/CTIO/g, 'KSIO'],
  [/CT([IUEOR])?/g, 'KT$1'],
  [/PH/g, 'F'],
  [/TH/g, 'T'],
  [/OW/g, 'OU'],
  [/LH/g, 'L'],
  [/RDL/g, 'RL'],
  [/CH(LO|R)/g, 'K$1'],
  [/PTIA/g, 'PSIA'],
  [/GU([^RLMBSTPZN])/g, 'G$1'],
  [/GNO(?=[MLTNRKG])/g, 'NIO$1'],

  // TI -> SI
  [/BUTI([EA])/g, 'BUSI$1'],
  [/BATIA/g, 'BASIA'],
  [/ANTIEL/g, 'ANSIEL'],
  [/RETION/g, 'RESION'],
  [/ENTI([EA])L/g, 'ENSI$1L'],
  [/ENTIO/g, 'ENSIO'],
  [/ENTIAI/g, 'ENSIAI'],
  [/UJETION/g, 'UJESION'],
  [/ATIEM/g, 'ASIAM'],
  [/PETIEN/g, 'PESIEN'],
  [/CETIE/g, 'CESIE'],
  [/OFETIE/g, 'OFESIE'],
  [/IPETI/g, 'IPESI'],
  [/L?BUTION/g, 'LBUSION'],
  [/L([EA])TION/g, 'L$1SION'],
  [/SATIET/g, 'SASIET'],
  [/(.+)ANTI(AL|O)/g, '$1ANSI$2'],
  [/(.+)INUTI([^V])/g, '$1INUSI$2'],
  [/([^O])UTIEN/g, '$1USIEN'],
  [/([^DE])RATI[E]$/, '$1RASI$2'],
  [/([^SNEU]|KU|KO|RU|LU|BU|TU|AU)T(IEN|ION)/g, '$1S$2']
];

/**
 * Exceptions.
 */
const EXCEPTIONS = {
  CD: 'CD',
  BD: 'BD',
  BV: 'BV',
  TABAC: 'TABA',
  FEU: 'FE',
  FE: 'FE',
  FER: 'FER',
  FIEF: 'FIEF',
  FJORD: 'FJORD',
  GOAL: 'GOL',
  FLEAU: 'FLEO',
  HIER: 'IER',
  HEU: 'E',
  HE: 'E',
  OS: 'OS',
  RIZ: 'RI',
  RAZ: 'RA',

  // Catching up exceptions placed elsewhere in the original algorithm
  ECHO: 'EKO'
};

/**
 * Function taking a single word and computing its phonetic code.
 *
 * @param  {string}  word - The word to process.
 * @return {string}       - The phonetic code.
 *
 * @throws {Error} The function expects the word to be a string.
 */
export default function phonetic(word) {

  // Preparing the word
  word = word
    .toUpperCase()
    .replace(/Œ/g, 'OEU')
    .replace(/Ç/g, 'S');

  word = deburr(word).replace(/[^A-Z]/g, '');

  let code = word;

  // First preprocessing
  for (let i = 0, l = FIRST_PREPROCESSING.length; i < l; i++) {
    const [pattern, replacement] = FIRST_PREPROCESSING[i];

    code = code.replace(pattern, replacement);
  }

  // Squeezing
  code = squeeze(code);

  // Is the word an exception?
  const exception = EXCEPTIONS[code];

  if (exception)
    return exception;

  // Second preprocessing
  for (let i = 0, l = SECOND_PREPROCESSING.length; i < l; i++) {
    const [pattern, replacement] = SECOND_PREPROCESSING[i];

    code = code.replace(pattern, replacement);
  }

  return code;
}
