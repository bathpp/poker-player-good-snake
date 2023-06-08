const Helper = require('./Helper');

class Player {
  static get VERSION() {
    return '0.7';
  }

  static async betRequest(gameState, bet) {
    const { players, current_buy_in, community_cards, minimum_raise, in_action, small_blind } = gameState;
    const myPlayer = players[in_action];
    const { stack, bet: currentBet } = myPlayer;

    if (stack < small_blind * 12) {
      bet(stack);
      return;
    }

    let betting = false;
    const hole_cards = players.filter((p) => p.hole_cards.length > 0)[0].hole_cards;

    if (community_cards.length === 0) {
      if (hole_cards.length === 2) {
        betting = Helper.twoCardCheck(hole_cards);
      }
      if (betting) {
        bet(current_buy_in + (minimum_raise * 2));
        return;
      }
      else {
        bet(0);
        return;
      }
    } else {
      const fiveCards = [...hole_cards, ...community_cards];
      // betting - true if rank >=3
      betting = await Helper.fiveCardCheck(fiveCards);
      if (betting) {
        bet(current_buy_in - currentBet);
        return;
      } else {
        if ((current_buy_in - currentBet) * 2 > stack) {
          bet(0);
          return;
        }
        bet(current_buy_in - currentBet);
        return;
      }

    }

  }

  static showdown(gameState) {
  }
}

module.exports = Player;
