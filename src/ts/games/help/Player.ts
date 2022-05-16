import { createElemWithClass, setTextContent } from '../../utilies/dom-helper';
import Counter from './Counter';

export default class Player {
  private name: string;
  private picture: string;
  private counter: Counter;

  constructor(name: string, picture: string) {
    this.name = name;
    this.picture = picture;
    this.counter = new Counter();
  }

  public incrementCount = (): void => {
    this.counter.incrementCounter();
  };

  public getCount = (): number => this.counter.getCounter();

  public resetCount = (): void => {
    this.counter.resetCounter();
  };

  public getName = (): string => this.name;

  public getPicture = (): string => this.picture;

  public getCountPlaceholderHtml = (): HTMLElement => {
    const $count = createElemWithClass(
      'p',
      'player',
      `player-${this.getName()}`
    );
    setTextContent($count, `${this.getName()} ${this.getPicture()}`);
    return $count;
  };

  public getCountHtml = (): HTMLElement => {
    const $count = createElemWithClass(
      'p',
      'player',
      `player-${this.getName()}`
    );
    setTextContent(
      $count,
      `Punktestand vom ${this.getName()}: ${this.getCount()}`
    );
    return $count;
  };
}