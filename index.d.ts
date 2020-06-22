// Minimum TypeScript Version: 3.0
type NgramFunction = (n: number, sequence: string) => string[];

declare module "talisman/inflectors/spanish" {
  function singularize(noun: string): string;
}

declare module "talisman/keyers/fingerprint" {
  // represented type of options parameter
  export interface TokenizerOptions {
    digits: boolean;
    minTokenSize: number;
    ngrams: boolean;
    sort: boolean;
    split: string[] | null;
    stopwords: string[] | null;
  }

  export function createTokenizer(options?: TokenizerOptions): NgramFunction;
  export default NgramFunction;
}

declare module "talisman/keyers/ngram-fingerprint" {
  const ngrams: NgramFunction;
  export default ngrams;

  // popular aliases
  export const bigrams: NgramFunction;
  export const trigrams: NgramFunction;
  export const quadrigrams: NgramFunction;
}

declare module "talisman/keyers/name-sig" {
  export default function nameSig(name: string): string;
}

declare module "talisman/keyers/omission" {
  export default function omission(str: string): string;
}

declare module "talisman/keyers/skeleton" {
  export default function skeleton(str: string): string;
}

