import {
  appendElem,
  createElemWithClass,
  removeAllChildNodes,
  setTextContent,
} from '../../utilies/dom-helper';
import { compareStrings } from '../../utilies/helper';
import Syllablesymbol from '../data/Syllablesymbol';
import Counter from '../help/Counter';

export default class Syllable {
  private $gameWrapper: HTMLElement;
  private $syllablesymbolString: HTMLElement;
  private $userInput: HTMLInputElement;

  private syllableValue: string;
  private syllablesymbol: Syllablesymbol;
  private syllablesString: string;
  private counter: Counter;

  constructor(syllableValue: string) {
    this.$gameWrapper = createElemWithClass('div', 'game-wrapper');
    this.$syllablesymbolString = createElemWithClass(
      'p',
      'syllablesymbol-string'
    );
    this.$userInput = document.createElement('input');
    this.$userInput.classList.add('user-input');
    this.setUserInputMaxLength();
    this.setUserInputWidth();
    this.$userInput.autofocus;

    this.counter = new Counter(1);
    this.syllablesymbol = new Syllablesymbol();
    this.syllableValue = syllableValue;
    this.syllablesString = '';

    setTextContent(
      this.$syllablesymbolString,
      this.syllablesymbolStringPlaceholderContent()
    );
  }

  public getGameWrapperStringHtml = () => {
    removeAllChildNodes(this.$gameWrapper);

    appendElem(this.$gameWrapper, this.$syllablesymbolString);
    return this.$gameWrapper;
  };

  public getGameWrapperInputHtml = () => {
    removeAllChildNodes(this.$gameWrapper);

    this.resetUserInput();
    appendElem(this.$gameWrapper, this.$userInput);

    return this.$gameWrapper;
  };

  public isBuild = () => {
    const $userInputElem = document.querySelector(
      '.user-input'
    ) as HTMLInputElement;
    const userString = $userInputElem.value.toUpperCase();
    const isEqual = compareStrings(userString, this.syllablesString);
    if (isEqual) {
      this.counter.incrementCounter();
      this.setSyllablesString();
      this.setSyllablesymbolStringContent();
      console.log(this.syllablesString);
    }
    this.resetUserInput();
    this.$userInput.maxLength += 2; // magic number
    this.setUserInputWidth();

    return isEqual;
  };

  public renderFinalResult = () => {
    removeAllChildNodes(this.$gameWrapper);

    const $finalWinner = createElemWithClass('p', 'final-winner');
    const finalWinnerText =
      this.counter.getCounter() > 2
        ? `Super, du hast dir ${this.counter.getCounter()} Silbenpaare merken können`
        : 'Schade, da ist wohl was schief gelaufen. Versuch es gleich nochmal...';
    setTextContent($finalWinner, finalWinnerText);
    appendElem(this.$gameWrapper, $finalWinner);

    this.syllablesymbolStringPlaceholderContent();
    this.setSyllablesymbolStringContent();
    this.counter.resetCounter(1);

    this.resetUserInput();
    this.setUserInputMaxLength();
    this.setUserInputWidth();

    return this.$gameWrapper;
  };

  private syllablesymbolStringPlaceholderContent = (): string => {
    this.syllablesString =
      this.syllablesymbol.getSyllablesymbol(this.syllableValue) +
      this.syllablesymbol.getSyllablesymbol(this.syllableValue);

    return this.syllablesString;
  };

  private setSyllablesString = (): void => {
    this.syllablesString += this.syllablesymbol.getSyllablesymbol(
      this.syllableValue
    );
  };

  private setSyllablesymbolStringContent = (): void => {
    setTextContent(this.$syllablesymbolString, this.syllablesString);
  };

  private setUserInputMaxLength = (): void => {
    // maybe a magic number
    this.$userInput.maxLength = 6;
  };

  private setUserInputWidth = (): void => {
    this.$userInput.style.width = `${this.$userInput.maxLength * 20}px`;
  };

  private resetUserInput = (): void => {
    this.$userInput.value = '';
  };

  public setFocusToInput = (): void => {
    document.querySelector('input').focus();
  };
}
