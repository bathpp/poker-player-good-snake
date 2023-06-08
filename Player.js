class Player {
  static get VERSION() {
    return '0.2';
  }

  static twoCardCheck(cards) {
    const [card1, card2] = cards;
    // const { rank: card1Rank, value: card1Suit } = card1;
    // const { rank: card2Rank, value: card2Suit } = card2;
    if (card1.rank === card2.rank
      || card1.rank > 10 || card2.rank > 10 ||
      (card1.suit === card2.suit)) {
      return true;
    }
    return false;
  }

  // fiveCardCheck(cards) {

  // }
  // sixCardCheck(cards) {

  // }
  // sevenCardCheck(cards) {

  // }
  // mergeCardsWithRiver(hole_cards, river) {

  // }
  static betRequest(gameState, bet) {
    const { players, current_buy_in, community_cards } = gameState;
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
