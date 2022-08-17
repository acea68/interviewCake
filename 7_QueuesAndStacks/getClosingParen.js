/* I like parentheticals (a lot).

"Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."

Write a function that, given a sentence like the one above, along with the position of an opening parenthesis, finds the corresponding closing parenthesis.

Example: if the example string above is input with the number 10 (position of the first parenthesis), the output should be 79 (position of the last parenthesis). */

function getClosingParen(sentence, openingParenIndex) {
  // Find the position of the matching closing parenthesis
  let stack = [];
  for (let i = 0; i < sentence.length; i++) {
    let char = sentence[i];
    if (char === '(') {
      stack.push([sentence[i], i]);
    }
    if (char === ')') {
      if (stack[stack.length - 1][0] === '(') {
        if (stack[stack.length - 1][1] === openingParenIndex) {
          return i;
        } else {
          stack.pop();
        }
      }
    }
  }
  throw new Error('Improper use of parens. Needs matching pair.');
}

// function getClosingParen(sentence, openingParenIndex) {
//   // Find the position of the matching closing parenthesis
//   let left = [0, []];
//   let right = [0, []];
//   for (let i = 0; i < sentence.length; i++) {
//     if (sentence[i] === '(') {
//       left[0]++;
//       left[1].push[i];
//     }
//     if (sentence[i] === ')') {
//       right[0]++;
//       right[1].push[i];
//     }
//   }
//   console.log('left: ', left)
//   console.log('right: ', right)
// }

// function getClosingParen(sentence, openingParenIndex) {
//   // Find the position of the matching closing parenthesis
//   let map = {};
//   for (let i = 0; i < sentence.length; i++) {
//     if (sentence[i] === '(') {
//       if (map['(']) {
//         map['('].count++;
//         map['('].index.push(i);
//       } else {
//         map['('] = {count: 1, index: [i]}
//       }
//     }
//     if (sentence[i] === ')') {
//       if (map[')']) {
//         map[')'].count++;
//         map[')'].index.push(i);
//       } else {
//         map[')'] = {count: 1, index: [i]}
//       }
//     }
//     // if (i === openingParenIndex) {
//     //   return map[')'];
//     // }
//   }
//   if (map['('].count !== map[')'].count) throw new Error('Improper use of parens. Needs matching pair.')
//   console.log('map: ', map)
//   // console.log("map[')'].index: ", map[')'].index)
//   console.log('🚀 ~ map["("].index.indexOf(openingParenIndex)', map['('].index.indexOf(openingParenIndex));
//   return map[')'].index[map['('].index.indexOf(openingParenIndex)];
// }

// function getClosingParen(sentence, openingParenIndex) {
//   // Find the position of the matching closing parenthesis
//   let map = {};
//   let index = 0;
//   let matchMirror = 0;
//   while(index < sentence.length) {
//     if (sentence[index] === '(') {
//       if (map[index]) {
//         map[index]++;
//       } else {
//         map[index] = 1;
//       }
//     }
//     if (index === openingParenIndex) matchMirror = index;
//     if (index === 2 * matchMirror) return index;
//     index++;
//   }
//   throw new Error('No closing paren found.')
// }

// function getClosingParen(sentence, openingParenIndex) {
//   let openNestedParens = 0;

//   for (let position = openingParenIndex + 1; position < sentence.length; position++) {
//     const char = sentence[position];

//     if (char === '(') {
//       openNestedParens += 1;
//     } else if (char === ')') {
//       if (openNestedParens === 0) {
//         return position;
//       }
//       openNestedParens -= 1;
//     }
//   }

//   throw new Error('No closing parenthesis :(');
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