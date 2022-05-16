export default class CardApi {
  private readonly HTTP: string;

  constructor() {
    this.HTTP = 'https://deckofcardsapi.com/api/deck';
  }

  async setDeck() {
    const res = await fetch(`${this.HTTP}/new/shuffle/?deck_count=1`);
    const data = await res.json();
    const jsonCardData = JSON.stringify(data);

    localStorage.setItem('cardApi', jsonCardData);
  }

  async getDeckRemaining() {
    const jsonCardData = await localStorage.getItem('cardApi');
    const cardData = JSON.parse(jsonCardData);
    const { remaining } = cardData;

    return remaining;
  }

  async getCards() {
    const deck_id = await this.getDeckId();
    const res = await fetch(`${this.HTTP}/${deck_id}/draw/?count=2`);
    const data = await res.json();

    return data;
  }

  // async setNewDeck(callback: Function) {
  async setNewDeck() {
    const deck_id = await this.getDeckId();
    const res = await fetch(`${this.HTTP}/${deck_id}/shuffle/?remaining`);
    const data = await res.json();

    // return callback(data);
    return data;
  }

  private async getDeckId() {
    const jsonCardData = await localStorage.getItem('cardApi');
    const cardData = JSON.parse(jsonCardData);
    const { deck_id } = cardData;

    return deck_id;
  }
}
