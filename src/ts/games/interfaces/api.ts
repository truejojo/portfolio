export interface Deck {
  success: boolean;
  cards: DeckCard[];
  deck_id: string;
  remaining: number;
}

interface DeckCard {
  image: string;
  value: string;
  suit: string;
  code: string;
}

// export interface SyllableInterface {
//   letters: string,
//   numbers: string,
//   zerosOnes: string,
// }

export interface TileObject {
  index: number;
  value: number | string;
}