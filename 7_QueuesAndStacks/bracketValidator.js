/* You're working with an intern that keeps coming to you with JavaScript code that won't run because the braces, brackets, and parentheses are off. To save you both some time, you decide to write a braces/brackets/parentheses validator.

Let's say:

'(', '{', '[' are called "openers."
')', '}', ']' are called "closers."
Write an efficient function that tells us whether or not an input string's openers and closers are properly nested.

Examples:

"{ [ ] ( ) }" should return true
"{ [ ( ] ) }" should return false
"{ [ }" should return false */

function isValid(code) {
  let round = square = curly = 0;
  let stack = [];
  for (let i = 0; i < code.length; i++) {
    let char = code[i];
    let last = stack[stack.length - 1];
    if (char === '(') {
      round++;
      stack.push(char);
    } else if (char === '[') {
      square++;
      stack.push(char);
    } else if (char === '{') {
      curly++;
      stack.push(char);
    } else if (char === ')') {
      if (last === '(') {
        round--;
        stack.pop(char);
      } else {
        return false
      }
    } else if (char === ']') {
      if (last === '[') {
        square--;
        stack.pop(char);
      } else {
        return false
      }
    } else if (char === '}') {
      if (last === '{') {
        curly--;
        stack.pop(char);
      } else {
        return false
      }
    }
  }
  return (round === 0 && square === 0 && curly === 0);
}

// function isValid(code) {

//   const openersToClosers = {
//     '(': ')',
//     '[': ']',
//     '{': '}',
//   };

//   const openers = new Set(['(', '[', '{']);
//   const closers = new Set([')', ']', '}']);

//   const openersStack = [];

//   for (let i = 0; i < code.length; i++) {
//     const char = code.charAt(i);

//     if (openers.has(char)) {
//       openersStack.push(char);
//     } else if (closers.has(char)) {
//       if (!openersStack.length) {
//         return false;
//       }
//       const lastUnclosedOpener = openersStack.pop();

//       // If this closer doesn't correspond to the most recently
//       // seen unclosed opener, short-circuit, returning false
//       if (openersToClosers[lastUnclosedOpener] !== char) {
//         return false;
//       }
//     }
//   }
//   return openersStack.length === 0;
// }

// TESTING
let desc, actual, expected;
desc = 'test valid short code';
actual = isValid('()');
expected = true;
assertEquals(actual, expected, desc)

desc = 'test valid longer code';
actual = isValid('([]{[]})[]{{}()}');
expected = true;
assertEquals(actual, expected, desc);

desc = 'test interleaved openers and closers';
actual = isValid('([)]');
expected = false;
assertEquals(actual, expected, desc);

desc = 'test mismatched opener and closer';
actual = isValid('([][]}');
expected = false;
assertEquals(actual, expected, desc);

desc = 'test missing closer';
actual = isValid('[[]()');
expected = false;
assertEquals(actual, expected, desc);

desc = 'test extra closer';
actual = isValid('[[]]())');
expected = false;
assertEquals(actual, expected, desc);

desc = 'test empty string';
actual = isValid('');
expected = true;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}