const Helper = require('./Helper');
const Player = require('./Player');


test('string with a single number should result in the number itself', async () => {
  expect(Helper.twoCardCheck([
    { "rank": "5", "suit": "diamonds" },
    { "rank": "6", "suit": "diamonds" },
  ])).toBe(true);

  const smallRank = await Helper.fiveCardCheck([
    { "rank": "2", "suit": "diamonds" },
    { "rank": "3", "suit": "diamonds" },
    { "rank": "7", "suit": "spades" },
    { "rank": "8", "suit": "hearts" },
    { "rank": "5", "suit": "hearts" },
    { "rank": "10", "suit": "hearts" }
  ])

  expect(smallRank).toBe(false);

  const goodRank = await Helper.fiveCardCheck([
    { "rank": "2", "suit": "diamonds" },
    { "rank": "3", "suit": "diamonds" },
    { "rank": "4", "suit": "spades" },
    { "rank": "5", "suit": "hearts" },
    { "rank": "6", "suit": "hearts" },
    { "rank": "7", "suit": "hearts" }
  ])

  expect(goodRank).toBe(true);


});