/* I want to learn some big words so people think I'm smart.

I opened up a dictionary to a page in the middle and started flipping through, looking for words I didn't know. I put each word I didn't know at increasing indices in a huge array I created in memory. When I reached the end of the dictionary, I started from the beginning and did the same thing until I reached the page I started at.

Now I have an array of words that are mostly alphabetical, except they start somewhere in the middle of the alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an alphabetically ordered array that has been "rotated." For example:

  const words = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];

JavaScript
Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. This array is huge (there are lots of words I don't know) so we want to be efficient here.

To keep things simple, you can assume all words are lowercase. */

function findRotationPoint(words) {
  let index = 0;
  let currWord = words[index];
  let nextWord = words[index + 1];
  while (currWord < nextWord && index < words.length) {
    index++;
    currWord = words[index];
    nextWord = words[index + 1];
  }
  return index + 1;
}

// function findRotationPoint(words) {
//   let index = 0;
//   let currWord = words[index];
//   let currCode = currWord[0].charCodeAt();
//   let nextWord = words[index + 1];
//   let nextCode = nextWord[0].charCodeAt();
//   while (currCode <= nextCode && index <= words.length) {
//     currWord = words[index];
//     currCode = currWord[0].charCodeAt();
//     nextWord = words[index + 1];
//     nextCode = nextWord[0].charCodeAt();
//     if (currCode === nextCode) {
//       let matchingChar = 0;
//       while (currWord[matchingChar].charCodeAt() <= nextWord[matchingChar].charCodeAt()) {
//         matchingChar++;
//       }
//       return index + 1;
//     }
//     index++;
//   }
//   return index;
// }

function findRotationPoint(words) {
  let floorInd = 0;
  let ceilInd = words.length - 1;
  while (floorInd < ceilInd) {
    let midInd = Math.floor(floorInd + (ceilInd - floorInd) / 2);
    if (words[floorInd] > words[midInd]) { // go left
      ceilInd = midInd;
    } else { // pivot is right of midpoint
      floorInd = midInd;
    }
    if (floorInd + 1 === ceilInd) {
      break;
    }
  }
  return ceilInd;
}

// function findRotationPoint(words) {
//   const firstWord = words[0];
//   let floorIndex = 0;
//   let ceilingIndex = words.length - 1;
//   while (floorIndex < ceilingIndex) {
//     // Guess a point halfway between floor and ceiling
//     const guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));
//     // If guess comes after first word or is the first word
//     if (words[guessIndex] >= firstWord) {
//       // Go right
//       floorIndex = guessIndex;
//     } else {
//       // Go left
//       ceilingIndex = guessIndex;
//     }
//     // If floor and ceiling have converged
//     if (floorIndex + 1 === ceilingIndex) {
//       // Between floor and ceiling is where we flipped to the beginning
//       // so ceiling is alphabetically first
//       break;
//     }
//   }
//   return ceilingIndex;
// }






let desc, actual, expected;
desc = 'small array';
actual = findRotationPoint(['cape', 'cake']);
expected = 1;
assertEquals(actual, expected, desc);

desc = 'medium array';
actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
expected = 4;
assertEquals(actual, expected, desc);

desc = 'large array';
actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
  'undulate', 'xenoepist', 'asymptote',
  'babka', 'banoffee', 'engender',
  'karpatka', 'othellolagkage']);
expected = 5;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}