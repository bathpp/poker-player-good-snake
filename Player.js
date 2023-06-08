const Helper = require('./Helper');
class Player {
  static get VERSION() {
    return '0.5.4';
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



  // fiveCardCheck(cards) {

  // }
  // sixCardCheck(cards) {

  // }
  // sevenCardCheck(cards) {

  // }
  // mergeCardsWithRiver(hole_cards, river) {

  // }
  static betRequest(gameState, bet) {
    const { players, current_buy_in, community_cards, minimum_raise, in_action } = gameState;
    let betting = false;
    const myPlayer = players[in_action];
    const { hole_cards } = myPlayer;
    const { stack, bet: currentBet } = myPlayer;

    if (stack < small_blind * 12) {
      bet(stack);
      return;
    }

    if (community_cards.length === 0) {
      if (hole_cards.length === 2) {
        betting = Helper.twoCardCheck(hole_cards);
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
