/* Given an array of integers, find the highest product you can get from three of the integers.

The input arrayOfInts will always have at least three integers. */

function highestProductOf3(arrayOfInts) {
  if (arrayOfInts.length < 3) throw new Error('Provide at least 3 inputs.');
  let highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
  let lowest = Math.min(arrayOfInts[0], arrayOfInts[1]);
  let highestProductOf2 = lowestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
  let highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];
  for (let i = 2; i < arrayOfInts.length; i++) {
    let currNum = arrayOfInts[i];
    highestProductOf3 = Math.max(highestProductOf3,
      highestProductOf2 * currNum,
      lowestProductOf2 * currNum);
    highestProductOf2 = Math.max(highestProductOf2,
      currNum * highest,
      currNum * lowest);
    lowestProductOf2 = Math.min(lowestProductOf2,
      currNum * lowest,
      currNum * highest);
    highest = Math.max(highest, currNum);
    lowest = Math.min(lowest, currNum);
  }
  return highestProductOf3;
}

// function highestProductOf3(arrayOfInts) {
//   if (arrayOfInts.length < 3) throw new Error('Provide at least 3 inputs.');
//   let prod = 1;
//   arrayOfInts.sort((a,b) => b - a);
//   for (let i = 0; i < 3; i++) {
//     prod *= arrayOfInts[i]
//   }
//   return prod;
// }


















// Tests

let desc = 'short array';
let actual = highestProductOf3([1, 2, 3, 4]);
let expected = 24;
assertEqual(actual, expected, desc);

desc = 'longer array';
actual = highestProductOf3([6, 1, 3, 5, 7, 8, 2]);
expected = 336;
assertEqual(actual, expected, desc);

desc = 'array has one negative';
actual = highestProductOf3([-5, 4, 8, 2, 3]);
expected = 96;
assertEqual(actual, expected, desc);

desc = 'array has two negatives';
actual = highestProductOf3([-10, 1, 3, 2, -10]);
expected = 300;
assertEqual(actual, expected, desc);

desc = 'array is all negatives';
actual = highestProductOf3([-5, -1, -3, -2]);
expected = -6;
assertEqual(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => (highestProductOf3([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => (highestProductOf3([1]));
assertThrowsError(oneNumber, desc);

desc = 'error with two numbers';
const twoNumber = () => (highestProductOf3([1, 1]));
assertThrowsError(twoNumber, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
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