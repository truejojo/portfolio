import { getDomElem } from "../../utilies/dom-helper";

export default class ControlFormRetentivity {
  private $syllables: HTMLElement;
  private $syllablesItems: any[];

  constructor() {
    this.$syllables = getDomElem('.syllables');
    this.$syllablesItems = Array.from(
      document.querySelectorAll('.syllables li')
    );
  }
  
  public setClickEvent = (): void => {
    this.$syllables.addEventListener('click', (event: Event) => {
      const $target = event.target as HTMLElement;
      this.$syllablesItems.map(li => li.classList.remove('is-clicked'));
      
      if ($target.matches('li')) {
        $target.classList.add('is-clicked');
      }
    });
  }

  public getSyllable = () =>
    getDomElem('.is-clicked').getAttribute('data-syllables');  
};
