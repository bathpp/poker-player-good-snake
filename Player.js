class Player {
  static get VERSION() {
    return '0.5';
  }

  checkSuit(cards) {
    const suitCount = {};
    cards.forEach((c) => {
      const { suit } = c;
      if (suitCount[suit]) {
        suitCount[suit] += 1;
      }
      else {
        suitCount[suit] = 1;
      }
    })
    return suitCount;
  }

  rankConvert(rank) {
    const faces = ['J', 'Q', 'K', 'A'];
    if (faces.includes(rank)) {
      return 11 + faces.indexOf(rank)
    }
    return Number(rank);
  }

  static twoCardCheck(cards) {
    const [card1, card2] = cards;
    // const { rank: card1Rank, value: card1Suit } = card1;
    // const { rank: card2Rank, value: card2Suit } = card2;
    const card1Rank = rankConvert(card1.rank);
    const card2Rank = rankConvert(card2.rank);
    if (card1Rank === card2Rank
      || (card1Rank > 10 || card2Rank > 10)
      || (card1.suit === card2.suit)) {
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
    const { players, current_buy_in, community_cards, minimum_raise } = gameState;
    let betting = false;
    const hole_cards = players.filter((p) => p.hole_cards.length > 0)[0].hole_cards;
    if (community_cards.length === 0) {
      if (hole_cards.length === 2) {
        betting = twoCardCheck(hole_cards);
      }
      if (betting) {
        bet(current_buy_in + (minimum_raise * 2));
      }
      else {
        bet(0);
      }
    } else {
      bet(current_buy_in + minimum_raise);
    }

  }

  static showdown(gameState) {
  }
}

module.exports = Player;
