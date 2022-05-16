import { getRandomNumber } from '../../utilies/helper';

export default class Syllablesymbol {
  private readonly VOWELS: string[];
  private readonly CONSONANTS: string[];
  private readonly NUMBERS: number;
  private readonly ZEROS_ONES: number;

  constructor() {
    this.VOWELS = ['a', 'e', 'i', 'o', 'u'];
    this.CONSONANTS = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'm',
      'n',
      'p',
      'r',
      's',
      't',
      'v',
      'w',
      'x',
      'z',
    ];
    this.NUMBERS = 10;
    this.ZEROS_ONES = 2;
  }

  public getSyllablesymbol = (syllableValue: string): string => {
    const syllableValues: { [index: string]: any } = {
      letters: this.getLetters(),
      numbers: this.getNumbers(),
      zerosOnes: this.getZerosOnes(),
    };

    return syllableValues[syllableValue].toUpperCase();
  };

  private getLetters = () => this.getRandomConsonant() + this.getRandomVowel();

  private getNumbers = () =>
    `${getRandomNumber(this.NUMBERS)}${getRandomNumber(this.NUMBERS)}`;

  private getZerosOnes = () =>
    `${getRandomNumber(this.ZEROS_ONES)}${getRandomNumber(this.ZEROS_ONES)}`;

  private getRandomVowel = () =>
    this.VOWELS[getRandomNumber(this.VOWELS.length)];

  private getRandomConsonant = () =>
    this.CONSONANTS[getRandomNumber(this.CONSONANTS.length)];
}
