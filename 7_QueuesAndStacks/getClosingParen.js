/* I like parentheticals (a lot).

"Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."

Write a function that, given a sentence like the one above, along with the position of an opening parenthesis, finds the corresponding closing parenthesis.

Example: if the example string above is input with the number 10 (position of the first parenthesis), the output should be 79 (position of the last parenthesis). */

function getClosingParen(sentence, openingParenIndex) {
  // Find the position of the matching closing parenthesis
  let pairCount = 0;
  for (let i = openingParenIndex + 1; i < sentence.length; i++) {
    let char = sentence[i];
    if (char === '(') pairCount++;
    if (char === ')') {
      if (pairCount === 0) {
        return i;
      } else {
        pairCount--;
      }
    }
  }
  throw new Error('Improper use of parens. Needs matching pair.');
}

// function getClosingParen(sentence, openingParenIndex) {
//   // Find the position of the matching closing parenthesis
//   let stack = [];
//   for (let i = 0; i < sentence.length; i++) {
//     let char = sentence[i];
//     if (char === '(') {
//       stack.push([sentence[i], i]);
//     }
//     if (char === ')') {
//       if (stack[stack.length - 1][1] === openingParenIndex) {
//         return i;
//       } else {
//         stack.pop();
//       }
//     }
//   }
//   throw new Error('Improper use of parens. Needs matching pair.');
// }
















// Tests

let desc = 'all openers then closers';
let actual = getClosingParen('((((()))))', 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = 'mixed openers and closers';
actual = getClosingParen('()()((()()))', 5);
expected = 10;
assertEqual(actual, expected, desc);

desc = 'no matching closer';
const noCloser = () => (getClosingParen('()(()', 2));
assertThrowsError(noCloser, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertThrowsError(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}