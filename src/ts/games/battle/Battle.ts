import 'regenerator-runtime/runtime';
import {
  createElemWithClass,
  getDomElem,
  appendElem,
  removeAllChildNodes,
  createBtn,
  createLink,
  removeEventListenerFromElem,
  addClass,
  removeClass,
} from '../../utilies/dom-helper';
import CardApi from '../data/CardApi';
import Card from './Card';

export default class Battle {
  private readonly cardApi: CardApi;
  private card: Card;

  private $gameBoard: HTMLElement;

  constructor() {
    this.cardApi = new CardApi();
    this.cardApi.setDeck();

    this.$gameBoard = getDomElem('.game-board');
  }

  public init = async () => {
    const startRemaining = await this.cardApi.getDeckRemaining();
    this.card = new Card(startRemaining);
  };

  public render = () => {
    this.removeChildrenFromGameBoard();

    appendElem(this.$gameBoard, this.card.getGameWrapperHtml());
    appendElem(this.$gameBoard, this.renderDrawCardsBtn());
  };

  private drawCards = async () => {
    const data = await this.cardApi.getCards();

    this.card.build(data);
    this.render();

    if (data.remaining <= 0) {
      const $drawCards = getDomElem('.draw-cards');
      removeEventListenerFromElem($drawCards, 'click', this.drawCards);
      setTimeout(this.endGame, 1300);
    }
  };

  private renderDrawCardsBtn = (): HTMLElement =>
    createBtn(
      'Karten aufdecken',
      this.drawCards,
      'btn',
      'btn--small',
      'draw-cards'
    );

  private endGame = (): void => {
    this.removeChildrenFromGameBoard();

    const $againBtn = createBtn('nochmal', this.playAgain, 'btn', 'draw-cards');
    const $backBtn = createLink(
      'games',
      './games.html',
      'btn',
      'btn--small',
      'btn-back'
    );
    const $homeBtn = createLink(
      'home',
      './index.html',
      'btn',
      'btn--small',
      'btn-home'
    );
    const $btnWrapper = createElemWithClass('div', 'btn-wrapper');

    appendElem($btnWrapper, $backBtn);
    appendElem($btnWrapper, $homeBtn);

    appendElem(this.$gameBoard, this.card.renderFinalResult());
    appendElem(this.$gameBoard, $againBtn);
    appendElem(this.$gameBoard, $btnWrapper);
    addClass(this.$gameBoard, 'final-result');
  };

  private removeChildrenFromGameBoard = (): void => {
    if (this.$gameBoard.hasChildNodes()) {
      removeAllChildNodes(this.$gameBoard);
    }
  };

  private playAgain = async () => {
    await this.cardApi.setNewDeck();
    await this.init();

    removeClass(this.$gameBoard, 'final-result');
    this.render();
  };
}
