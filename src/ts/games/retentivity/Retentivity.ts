import 'regenerator-runtime/runtime';
import {
  getDomElem,
  removeAllChildNodes,
  appendElem,
  createBtn,
  createLink,
  createElemWithClass,
  addClass,
} from '../../utilies/dom-helper';
import Syllable from './Syllable';

export default class Retentivity {
  private $gameBoard: HTMLElement;
  private syllableValue: string;
  private syllable: Syllable;

  constructor(value: string) {
    this.syllableValue = value;
    this.syllable = new Syllable(this.syllableValue);

    this.$gameBoard = getDomElem('.game-board');
  }

  public render = () => {
    removeAllChildNodes(this.$gameBoard);
    appendElem(this.$gameBoard, this.syllable.getGameWrapperStringHtml());
    appendElem(this.$gameBoard, this.renderInputFieldBtnHtml());

    document.removeEventListener('keydown', this.secondEvent);
    document.addEventListener('keydown', this.firstEvent);

    // not working together with the btn
    // setTimeout(this.renderInputField, 3500);
  };

  private firstEvent = (event: any): void =>
    event.code === 'Enter' && this.renderInputField();

  private renderInputField = (): void => {
    removeAllChildNodes(this.$gameBoard);
    appendElem(this.$gameBoard, this.syllable.getGameWrapperInputHtml());
    appendElem(this.$gameBoard, this.renderCompareStringsBtnHtml());

    this.syllable.setFocusToInput();
    document.removeEventListener('keydown', this.firstEvent);
    document.addEventListener('keydown', this.secondEvent);

    // not working together with the btn
    // setTimeout(this.isCompareStringsTrue, 5000);
  };

  private secondEvent = (event: any): void => 
    event.code === 'Enter' && this.isCompareStringsTrue();

  private renderInputFieldBtnHtml = (): HTMLElement =>
    createBtn(
      'OK',
      this.renderInputField,
      'btn',
      'btn--small',
      'show-input-field'
    );

  private isCompareStringsTrue = (): void => 
    this.syllable.isBuild() ? this.render() : this.endGame();

  private renderCompareStringsBtnHtml = (): HTMLElement =>
    createBtn(
      'OK',
      this.isCompareStringsTrue,
      'btn',
      'btn--small',
      'compare-strings'
    );

  private endGame = (): void => {
    removeAllChildNodes(this.$gameBoard);
    document.removeEventListener('keydown', this.firstEvent);
    document.removeEventListener('keydown', this.secondEvent);

    const $againBtn = createBtn('nochmal', this.render, 'btn', 'again');
    const $backBtn = createLink(
      'merkfähigkeit',
      './retentivity.html',
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

    appendElem(this.$gameBoard, this.syllable.renderFinalResult());
    appendElem(this.$gameBoard, $againBtn);
    appendElem(this.$gameBoard, $btnWrapper);
    addClass(this.$gameBoard, 'final-result');
  };
}
