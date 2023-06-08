const fetch = require('node-fetch');
class Player {
  static get VERSION() {
    return '0.6';
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
    const card1Rank = rankConvert(card1.rank);
    const card2Rank = rankConvert(card2.rank);
    if (card1Rank === card2Rank
      || (card1Rank > 10 || card2Rank > 10)
      || (card1.suit === card2.suit)) {
      return true;
    }
    return false;
  }



  static async fiveCardCheck(cards) {
    const data = await fetch('http://rainman.leanpoker.org/rank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: `cards=${JSON.stringify(cards)}`
    })

    const ranks = await data.text();
    const { rank } = JSON.parse(ranks);
    console.log("🚀 ~ file: Player.js:57 ~ Player ~ fiveCardCheck ~ rank:", rank);
    if (rank >= 3) {
      return true;
    }
    return false;

  }
  // sixCardCheck(cards) {

  // }
  // sevenCardCheck(cards) {

  // }
  // mergeCardsWithRiver(hole_cards, river) {

  // }
  static betRequest(gameState, bet) {

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
        betting = twoCardCheck(hole_cards);
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
      betting = fiveCardCheck(fiveCards);
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
