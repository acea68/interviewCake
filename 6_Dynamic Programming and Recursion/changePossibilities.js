/* Your quirky boss collects rare, old coins...

They found out you're a programmer and asked you to solve something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make the amount of money with coins of the available denominations.

Example: for amount=44 (44¢) and denominations=[1,2,3][1,2,3] (11¢, 22¢ and 33¢), your program would output 44—the number of ways to make 44¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢ */

// function changePossibilities(amountLeft, denominations) {
//   // Calculate the number of ways to make change
//   let denom = denominations.sort(); // if not sorted already
//   let combos = [];
//   let totalWays = 0;
//   let total = 0;
//   for (let j = denom.length - 1; j >= 0; j--) {
//     if (denom[j] <= amountLeft - total) {
//       total += denom[j];
//       if (!combos[denom[j]]) {
//         combos[denom[j]] = 1;
//       } else {
//         combos[denom[j]] += 1;
//       }
//     }
//     while (total < amountLeft) {
//       for (let i = 0; i < denom.length; i++) {
//         if (denom[i] <= amountLeft - total) {
//           total += denom[i];
//           if (!combos[denom[i]]) {
//             combos[denom[i]] = 1;
//           } else {
//             combos[denom[i]] += 1;
//           }
//         }
//       }
//       // if (total === amountLeft) return totalWays;
//     }
//     if (total === amountLeft) {

//       totalWays++;
//       total = 0;
//     }
//   }
//   return totalWays;
// }


function changePossibilitiesTopDown(amountLeft, denominations, currentIndex = 0) {

  // Base cases:
  // We hit the amount spot on. yes!
  if (amountLeft === 0) return 1;

  // We overshot the amount left (used too many coins)
  if (amountLeft < 0) return 0;

  // We're out of denominations
  if (currentIndex === denominations.length) return 0;

  console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');

  // Choose a current coin
  const currentCoin = denominations[currentIndex];

  // See how many possibilities we can get
  // for each number of times to use currentCoin
  let numPossibilities = 0;
  while (amountLeft >= 0) {
    numPossibilities += changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
    amountLeft -= currentCoin;
  }

  return numPossibilities;
}

// ❯ changePossibilitiesTopDown(4, [1, 2, 3]);
//   checking ways to make 4 with [1, 2, 3]
//   checking ways to make 4 with [2, 3]
//   checking ways to make 4 with [3]
//   checking ways to make 3 with [2, 3]
//   checking ways to make 3 with [3]
//   checking ways to make 2 with [2, 3]
//   checking ways to make 2 with [3]
//   checking ways to make 1 with [2, 3]
//   checking ways to make 1 with [3]
// ❮ 4













actual = changePossibilitiesTopDown(2, [1, 2]);


// Tests
let desc, actual, expected;
// desc = 'sample input';
// actual = changePossibilities(4, [1, 2, 3]);
// expected = 4;
// assertEqual(actual, expected, desc);

// desc = 'one way to make zero cents';
// actual = changePossibilities(0, [1, 2]);
// expected = 1;
// assertEqual(actual, expected, desc);

// desc = 'no ways if no coins';
// actual = changePossibilities(1, []);
// expected = 0;
// assertEqual(actual, expected, desc);

// desc = 'big coin value';
// actual = changePossibilities(5, [25, 50]);
// expected = 0;
// assertEqual(actual, expected, desc);

// desc = 'big target amount';
// actual = changePossibilities(50, [5, 10]);
// expected = 6;
// assertEqual(actual, expected, desc);

// desc = 'change for one dollar';
// actual = changePossibilities(100, [1, 5, 10, 25, 50]);
// expected = 292;
// assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}