export default class Counter {
  private counter: number;

  constructor(num: number = 0) {
    this.counter = num;
  }

  public incrementCounter(): void {
    this.counter++;
  }

  public getCounter(): number {
    return this.counter;
  }

  public resetCounter(num: number = 0): void {
    this.counter = num;
  }
}
