class Player {
  static get VERSION() {
    return '0.1';
  }

  static twoCardCheck(cards) {
    const [card1, card2] = cards;
    // const { rank: card1Rank, value: card1Suit } = card1;
    // const { rank: card2Rank, value: card2Suit } = card2;
    if (card1.rank === card2.rank) {
      return true;
    }
    return false;
  }
  // threeCardCheck(cards) {

  // }
  // fourCardCheck(cards) {

  // }
  // fiveCardCheck(cards) {

  // }
  // sixCardCheck(cards) {

  // }
  // sevenCardCheck(cards) {

  // }
  // mergeCardsWithRiver(hole_cards, river) {

  // }
  static betRequest(gameState, bet) {
    const { players, current_buy_in } = gameState;
    let betting = false;
    const hole_cards = players.filter((p) => p.hole_cards.length > 0)[0].hole_cards;
    if (hole_cards.length === 2) {
      betting = twoCardCheck(hole_cards);
    }
    if (betting) {
      bet(current_buy_in);
    }
    else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
