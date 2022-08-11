/* You created a game that is more popular than Angry Birds.

Each round, players receive a score between 0 and 100, which you use to rank them from highest to lowest. So far you're using an algorithm that sorts in O(nlg{n}) time, but players are complaining that their rankings aren't updated fast enough. You need a faster sorting algorithm.

Write a function that takes:

an array of unsortedScores
the highestPossibleScore in the game
and returns a sorted array of scores in less than O(nlg{n}) time.

For example:

  const unsortedScores = [37, 89, 41, 65, 91, 53];
const HIGHEST_POSSIBLE_SCORE = 100;

sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
// returns [91, 89, 65, 53, 41, 37]

We’re defining n as the number of unsortedScores because we’re expecting the number of players to keep climbing.

And, we'll treat highestPossibleScore as a constant instead of factoring it into our big O time and space costs because the highest possible score isn’t going to change. Even if we do redesign the game a little, the scores will stay around the same order of magnitude. */

function sortScores(unorderedScores, highestPossibleScore) {
  // Sort the scores in O(n) time
  let possibleScores = new Array(highestPossibleScore + 1).fill(0); // make new array of all scores up to highest set to all zeros
  for (let score of unorderedScores) { // for every score entered, populate # of times encountered in the new array just created with scores represented as the respective index
    possibleScores[score]++;
  }
  let orderedScores = []; // prepare sorted scores array
  for (let score = highestPossibleScore; score >= 0; score--) { // for each score in the new array, starting at highest score possible counting down,
    let count = possibleScores[score];
    for (let i = 0; i < count; i++) { // push score into sorted array if # times encountered is > 0, otherwise skip (this is the filter to obtain only scores with encounters > 1)
      orderedScores.push(score)
    }
  }
  return orderedScores;
}


















// Tests

let desc = 'no scores';
let actual = sortScores([], 100);
let expected = [];
assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

desc = 'one score';
actual = sortScores([55], 100);
expected = [55];
assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

desc = 'two scores';
actual = sortScores([30, 60], 100);
expected = [60, 30];
assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

desc = 'many scores';
actual = sortScores([37, 89, 41, 65, 91, 53], 100);
expected = [91, 89, 65, 53, 41, 37];
assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

desc = 'repeated scores';
actual = sortScores([20, 10, 30, 30, 10, 20], 100);
expected = [30, 30, 20, 20, 10, 10];
assertEqual(JSON.stringify(actual), JSON.stringify(expected), desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}