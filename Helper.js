const fetch = require('node-fetch');

function rankConvert(rank) {
  const faces = ['J', 'Q', 'K', 'A'];
  if (faces.includes(rank)) {
    return 11 + faces.indexOf(rank)
  }
  return Number(rank);
}

class Helper {
  static checkSuit(cards) {
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

  // static async fiveCardCheck(cards) {
  //   try {
  //     const data = await fetch('http://rainman.leanpoker.org/rank', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Accept': 'application/json',
  //       },
  //       body: `cards=${JSON.stringify(cards)}`
  //     })

  //     const ranks = await data.text();
  //     const { rank } = JSON.parse(ranks);
  //     if (rank >= 3) {
  //       return true;
  //     }
  //     return false;
  //   } catch (e) {
  //     return false;
  //   }


  // }
}

module.exports = Helper;
