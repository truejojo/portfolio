import { shuffleArray, duplicateArray, getRandomNumber } from '../../utilies/helper';
import { TileTyp } from '../type/types';
import { TileObject } from '../interfaces/api';

export default class Tilesymbol {
  private readonly LETTERS: string[];
  private readonly SMILEYS: string[];
  private readonly EMOJIS: string[];

  constructor() {
    this.LETTERS = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    this.SMILEYS = [
      '๐',
      '๐',
      '๐คฃ',
      '๐',
      '๐',
      '๐ค ',
      '๐คก',
      '๐คข',
      '๐ฅฑ',
      '๐ฅณ',
      '๐ด',
      '๐',
      '๐ฅถ',
      '๐ก',
      '๐',
      '๐คฏ',
    ];
    this.EMOJIS = [
      'โฝ๏ธ',
      '๐จ',
      '๐โโ๏ธ',
      '๐ธ',
      '๐ถ',
      '๐ฐ',
      '๐',
      '๐',
      '๐ก',
      '๐ฝ',
      '๐',
      '๐ฏ',
      '๐ซ',
      '๐',
      '๐ณ',
      '๐',
      '๐ท',
      '๐',
      '๐จโ๐ฉโ๐งโ๐ฆ',
      '๐ฉโ๐พ',
      '๐ฃ',
      'โ',
    ];
  }

  getTilesymbol(count: number = 8, tileTyp: TileTyp = 'numbers'): TileObject[] {
    return this.setShuffleArray(
      this.setDuplicateArray(
        this.createCardsArrayOfObjects(this.setTypOfCards(tileTyp, count))
      )
    );
  }

  private setTypOfCards = (tileTyp: TileTyp, count: number): (number | string)[] => {
    const tileObject = {
      letters: shuffleArray(this.LETTERS).slice(0, count),
      numbers: this.setNumber(new Set(), count),
      smileys: shuffleArray(this.SMILEYS).slice(0, count),
      emojis: shuffleArray(this.EMOJIS).slice(0, count),
    };
    return tileObject[tileTyp];
  };

  private createCardsArrayOfObjects = (
    tileArray: (number | string)[]
  ): TileObject[] => {
    return tileArray.map((value: number | string, index: number) => {
      return { index, value };
    });
  };

  private setNumber = (set: Set<number>, count: number): number[] => {
    // set.size === count && [...set];
    if (set.size === count) {
      return [...set];
    }
    set.add(getRandomNumber(100, 1));

    return this.setNumber(set, count);
  };

  private setDuplicateArray = (tileArray: TileObject[]): TileObject[] =>
    duplicateArray(tileArray);

  private setShuffleArray = (tileArray: TileObject[]): TileObject[] =>
    shuffleArray(tileArray);
}
