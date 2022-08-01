/* Write a function that takes an array of characters and reverses the letters in place. ↴

Why an array of characters instead of a string?

The goal of this question is to practice manipulating strings in place. Since we're modifying the input, we need a mutable ↴ type like an array, instead of JavaScript's immutable strings. */

function reverse(arr) {
  // i: arr of characters
  // o: same arr of characters in reversed order
  // c:
  // e: empty arr, one char array

  // swap last and first elems
  // swap 2nd to last and 2nd elems
  // swap 3rd to L and 3rd elems
  // perform this action n/2 times
  let first = 0;
  let last = arr.length - 1;
  while (first <= Math.floor(arr.length/2)) {
    let temp = arr[first];
    arr[first] = arr[last];
    arr[last] = temp;
    first++;
    last--;
  }
  return arr;
}


















// Tests

let desc = 'empty string';
let input = ''.split('');
reverse(input);
let actual = input.join('');
let expected = '';
assertEqual(actual, expected, desc);

desc = 'single character string';
input = 'A'.split('');
reverse(input);
actual = input.join('');
expected = 'A';
assertEqual(actual, expected, desc);

desc = 'longer string';
input = 'ABCDE'.split('');
reverse(input);
actual = input.join('');
expected = 'EDCBA';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}