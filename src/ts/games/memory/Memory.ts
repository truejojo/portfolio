import 'regenerator-runtime/runtime';
import {
  appendElem,
  getDomElem,
  removeAllChildNodes,
  createElemWithClass,
  setAttributeElem,
  setTextContent,
  createBtn,
  createLink,
  addClass,
} from '../../utilies/dom-helper';
import Tilesymbol from '../data/Tilesymbol';
import Counter from '../help/Counter';
import { TileTyp } from '../type/types';

export default class Memory {
  private readonly TIMEOUT: number;
  private readonly PAIR_TILE: number;

  private $gameBoard: HTMLElement;
  private $gameWrapper: HTMLElement;
  private $table: HTMLElement;

  private tileSymbol: Tilesymbol;
  private tileCounter: Counter;
  private tryCounter: Counter;
  private guessCards: HTMLElement[];

  private numberOPpairs: number;
  private typOfCard: TileTyp;

  constructor(pair: string, typ: string) {
    this.TIMEOUT = 750;
    this.PAIR_TILE = 2;

    this.$gameWrapper = createElemWithClass('div', 'game-wrapper');
    this.$table = createElemWithClass('div', 'tile-table');

    this.numberOPpairs = parseInt(pair);
    this.typOfCard = <TileTyp>typ;
    this.$gameBoard = getDomElem('.game-board');
    this.tileSymbol = new Tilesymbol();
    this.tileCounter = new Counter();
    this.tryCounter = new Counter();
    this.guessCards = [];
  }

  public render = (): void => {
    removeAllChildNodes(this.$gameBoard);
    removeAllChildNodes(this.$gameWrapper);
    removeAllChildNodes(this.$table);
    appendElem(this.$gameBoard, this.getGameWrapperHtml());
  };

  private getGameWrapperHtml = (): HTMLElement => {
    const tiles = this.tileSymbol.getTilesymbol(
      this.numberOPpairs,
      this.typOfCard
    );
    tiles.map(tile => {
      const $tile = createElemWithClass('div', 'tile') as HTMLElement;
      setAttributeElem($tile, 'data-index', tile.index.toString());
      setTextContent($tile, tile.value.toString());
      appendElem(this.$table, $tile);
    });
    appendElem(this.$gameWrapper, this.$table);
    this.addListener();
    return this.$gameWrapper;
  };

  private listenerCardsClick = (event: Event): void => {
    const $target = event.target as HTMLElement;

    if ($target.matches('.tile') && !$target.matches('.tile.show-tile')) {
      // $target.classList.remove('hide-tile');
      $target.classList.add('show-tile');
      this.guessCards = [...this.guessCards, $target];

      if (this.guessCards.length === this.PAIR_TILE) {
        this.removeListener();
        setTimeout(() => this.checkForMatch(), this.TIMEOUT);
      }
    }
  };

  private checkForMatch = (): void => {
    const [$firstCard, $secondCard] = this.guessCards;
    const firstCardIndex = $firstCard.getAttribute('data-index');
    const secondCardIndex = $secondCard.getAttribute('data-index');
    this.tryCounter.incrementCounter();

    firstCardIndex === secondCardIndex
      ? this.matchCards($firstCard, $secondCard)
      : this.resetCards($firstCard, $secondCard);

    if (this.tileCounter.getCounter() === this.numberOPpairs) {
      // this.$btnPlayAgain.classList.add('show-btn-play-again');
      // this.listenerBtnPlayAgain();
      this.endGame();
    }

    this.guessCards = [];
    this.addListener();
  };

  private matchCards = (
    $firstCard: HTMLElement,
    $secondCard: HTMLElement
  ): void => {
    this.tileCounter.incrementCounter();
    $firstCard.classList.add('hide-tile');
    $secondCard.classList.add('hide-tile');
    this.resetCards($firstCard, $secondCard);
  };

  private resetCards = (
    $firstCard: HTMLElement,
    $secondCard: HTMLElement
  ): void => {
    $firstCard.classList.remove('show-tile');
    $secondCard.classList.remove('show-tile');
  };

  private endGame = () => {
    removeAllChildNodes(this.$gameBoard);
    removeAllChildNodes(this.$gameWrapper);
    removeAllChildNodes(this.$table);

    const $againBtn = createBtn('nochmal', this.render, 'btn', 'again');
    const $backBtn = createLink(
      'memory',
      './memory.html',
      'btn',
      'btn--small',
      'btn-back'
    );
    const $gamesBtn = createLink(
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
    appendElem($btnWrapper, $gamesBtn);
    appendElem($btnWrapper, $homeBtn);

    appendElem(this.$gameBoard, this.renderFinalResult());
    appendElem(this.$gameBoard, $againBtn);
    appendElem(this.$gameBoard, $btnWrapper);
    addClass(this.$gameBoard, 'flow-content');
  };

  private renderFinalResult = (): HTMLElement => {
    removeAllChildNodes(this.$gameWrapper);

    const $finalWinner = createElemWithClass('p', 'final-winner');
    const finalWinnerText = `Super, du hast in ${this.tryCounter.getCounter()}  Versuchen alle ${this.numberOPpairs} Kartenpaare geschafft`;
    setTextContent($finalWinner, finalWinnerText);
    appendElem(this.$gameWrapper, $finalWinner);

    this.tryCounter.resetCounter();
    this.tileCounter.resetCounter();

    return this.$gameWrapper;
  };

  private addListener = (): void => {
    this.$table.addEventListener('click', this.listenerCardsClick);
  };

  private removeListener = (): void => {
    this.$table.removeEventListener('click', this.listenerCardsClick);
  };
}
