import {
  createElemWithClass,
  setTextContent,
  setAttributeElem,
  appendElem,
  removeAllChildNodes,
} from '../../utilies/dom-helper';
import { Deck } from '../interfaces/api';
import Player from '../help/Player';

export default class Card {
  private $gameWrapper: HTMLElement;
  private $remainingCards: HTMLElement;
  private $battleWinner: HTMLElement;
  private $cardWrapperArray: HTMLElement[];
  private $cardsWrapper: HTMLElement;
  private hasImage: boolean;

  private playerArray: Player[];
  private cardsArray: string[];

  constructor(startRemaining: any) {
    this.$gameWrapper = createElemWithClass('div', 'game-wrapper');
    this.$remainingCards = createElemWithClass(
      'p',
      'remaining-cards',
      'margin-bottom'
    );
    this.$battleWinner = createElemWithClass(
      'p',
      'battle-winner',
      'margin-bottom'
    );
    this.$cardsWrapper = createElemWithClass('div', 'cards-wrapper');

    this.playerArray = [
      new Player('Computer', '💻'),
      new Player('Spieler', '🙂'),
    ];

    setTextContent(
      this.$remainingCards,
      this.getRemainigCardsPlaceholderHtml(startRemaining)
    );
    setTextContent(this.$battleWinner, this.getBattleWinnerPlaceholderHtml());

    this.hasImage = false;
    this.$cardWrapperArray = this.getCardsWrapperPlaceholderHtml();
    this.cardsArray = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'JACK',
      'QUEEN',
      'KING',
      'ACE',
    ];
  }

  public getGameWrapperHtml = (): HTMLElement => {
    removeAllChildNodes(this.$gameWrapper);

    const infoWrapper = createElemWithClass('div', 'info-wrapper');

    appendElem(infoWrapper, this.$remainingCards);
    appendElem(infoWrapper, this.$battleWinner);
    appendElem(this.$gameWrapper, infoWrapper);

    for (const cardWrapper of this.$cardWrapperArray) {
      appendElem(this.$cardsWrapper, cardWrapper);
    }
    appendElem(this.$gameWrapper, this.$cardsWrapper);

    return this.$gameWrapper;
  };

  private getRemainigCardsPlaceholderHtml = (startRemaining: any): string =>
    `Noch vorhandene Karten: ${startRemaining}`;

  private getBattleWinnerPlaceholderHtml = (): string =>
    `Das Battle gewonnen hat:`;

  private getCardsWrapperPlaceholderHtml = (): HTMLElement[] => {
    removeAllChildNodes(this.$cardsWrapper);

    const placeholderCardsArray = new Array(2).fill(0);
    return this.getNewCardsWrapperArray(placeholderCardsArray);
  };

  public build = (data: Deck): void => {
    this.setRemainigCardsHtml(data);
    this.setCardsWrapperHtml(data);
  };

  private setRemainigCardsHtml = (data: Deck): void => {
    const remainingCards = data.remaining;
    setTextContent(
      this.$remainingCards,
      `Noch vorhandene Karten: ${remainingCards}`
    );
  };

  private setBattleWinnerHtml = (winner: string): void => {
    setTextContent(this.$battleWinner, winner);
  };

  private setCardsWrapperHtml = (data: Deck) => {
    removeAllChildNodes(this.$cardsWrapper);
    this.hasImage = true;

    const cardsArray = this.buildNewData(data);
    this.checkWinnerOfBattle(cardsArray);
    this.$cardWrapperArray = this.getNewCardsWrapperArray(cardsArray);
  };

  private getNewCardsWrapperArray = (cardsArray: any[]): HTMLElement[] => {
    return cardsArray.map((card: any, index: number) => {
      const newIndex = index + 1;

      const $cardWrapper = createElemWithClass(
        'div',
        `card-wrapper`,
        `card-${newIndex}-wrapper`
      );
      const $cardSlot = createElemWithClass(
        'div',
        `card-slot`,
        `card-${newIndex}-slot`
      );

      if (this.hasImage) {
        const player = this.playerArray[index];
        const $countHtml = player.getCountHtml();
        appendElem($cardWrapper, $countHtml);

        const $img = createElemWithClass(
          'img',
          `card-img`,
          `card-${newIndex}-img`
        );
        setAttributeElem($img, 'src', card.image);
        appendElem($cardSlot, $img);
      } else {
        const player = this.playerArray[index];
        const $namePlaceholderHtml = player.getCountPlaceholderHtml();
        appendElem($cardWrapper, $namePlaceholderHtml);
      }

      appendElem($cardWrapper, $cardSlot);
      return $cardWrapper;
    });
  };

  private buildNewData = (data: Deck) => {
    return data.cards.map((card, index) => {
      return {
        image: card.image,
        value: this.getCardValue(card.value),
        name: `img-${index + 1}`,
      };
    });
  };

  private getCardValue(cardValue: string): number {
    return this.cardsArray.indexOf(cardValue);
  }

  private checkWinnerOfBattle = (cards: any[]): void => {
    const [card1, card2] = cards;
    const [computer, person] = this.playerArray;
    const WINNER = 'Das Battle gewonnen hat: ';

    if (card1.value > card2.value) {
      computer.incrementCount();
      const winnerComputer = `${WINNER} ${computer.getName()}`;
      this.setBattleWinnerHtml(winnerComputer);
    } else if (card1.value < card2.value) {
      person.incrementCount();
      const winnerPerson = `${WINNER} ${person.getName()}`;
      this.setBattleWinnerHtml(winnerPerson);
    } else {
      this.setBattleWinnerHtml('Unentschieden');
    }
  };

  public renderFinalResult = (): HTMLElement => {
    removeAllChildNodes(this.$gameWrapper);

    const $finalWinner = this.getFinalWinner();
    appendElem(this.$gameWrapper, $finalWinner);

    return this.$gameWrapper;
  };

  private getFinalWinner = (): HTMLElement => {
    const [computer, person] = this.playerArray;
    const pcCount = computer.getCount();
    const personCount = person.getCount();
    const $finalWinner = createElemWithClass('p', 'final-winner');
    const $finalWinnerEmoji = createElemWithClass('span', 'final-winner-emoji');

    if (pcCount > personCount) {
      setTextContent(
        $finalWinner,
        `Der Computer hat mit ${pcCount} Punkten zu ${personCount} Punkten gewonnen.`
      );
      setTextContent($finalWinnerEmoji, computer.getPicture());
    } else if (pcCount < personCount) {
      setTextContent(
        $finalWinner,
        `Hey ho - Du hast gewonnen. Mit ${personCount} zu ${pcCount} Punkten hast Du den Computer geschlagen`
      );
      setTextContent($finalWinnerEmoji, person.getPicture());
    } else {
      setTextContent(
        $finalWinner,
        `Das Spiel ist Unentschieden ausgegangen. Ihr habt mit ${pcCount} Punkten, gleich viele Punkte erreicht.`
      );
      setTextContent($finalWinnerEmoji, '👩🏼‍💻👨‍💻');
    }
    appendElem($finalWinner, $finalWinnerEmoji);
    return $finalWinner;
  };
}
