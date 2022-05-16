import { getDomElem } from '../../utilies/dom-helper';

export default class ControlFormMemory {
  private $pairs: HTMLElement;
  private $types: HTMLElement;
  private $pairItems: HTMLElement[];
  private $typItems: HTMLElement[];

  constructor() {
    this.$pairs = getDomElem('.card-pairs');
    this.$types = getDomElem('.card-types');
    this.$pairItems = Array.from(document.querySelectorAll('.card-pairs li'));
    this.$typItems = Array.from(document.querySelectorAll('.card-types li'));
  }

  public setClickEvents = (): void => {
    this.organizeSetClickEvents(this.$pairs, this.$pairItems);
    this.organizeSetClickEvents(this.$types, this.$typItems);
  };

  public getPairs = () =>
    document
      .querySelector('.card-pairs .is-clicked')
      .getAttribute('data-card-pair');

  public getTypes = () =>
    document
      .querySelector('.card-types .is-clicked')
      .getAttribute('data-card-typ');

  private organizeSetClickEvents = (
    elem: HTMLElement,
    arr: HTMLElement[]
  ): void => {
    elem.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      arr.map(li => li.classList.remove('is-clicked'));
      target.matches('li') && target.classList.add('is-clicked');
      // if (target.matches('li')) {
      //   target.classList.add('is-clicked');
      // }
    });
  };
}
