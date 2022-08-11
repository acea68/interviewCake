/* Find a duplicate, Space Edition™ BEAST MODE

In Find a duplicate, Space Edition™, we were given an array of integers where:

the integers are in the range 1...n
the array has a length of n+1
These properties mean the array must have at least 1 duplicate. Our challenge was to find a duplicate number without modifying the input and optimizing for space. We used a divide and conquer approach, iteratively cutting the array in half to find a duplicate integer in O(nlgn) time and O(1) space (sort of a modified binary search).

But we can actually do better. We can find a duplicate integer in O(n) time while keeping our space cost at O(1).

This is a tricky one to derive (unless you have a strong background in graph theory), so we'll get you started:

Imagine each item in the array as a node in a linked list. In any linked list, ↴ each node has a value and a "next" pointer. In this case:

The value is the integer from the array.
The "next" pointer points to the value-eth node in the list (numbered starting from 1). For example, if our value was 3, the "next" node would be the third node.
Here’s a full example:

An array [2, 3, 1, 3], so 2 is in the first position and points to 3 in the second position.
Notice we're using "positions" and not "indices." For this problem, we'll use the word "position" to mean something like "index," but different: indices start at 0, while positions start at 1. More rigorously: position = index + 1.

Using this, find a duplicate integer in O(n) time while keeping our space cost at O(1). Just like before, don't modify the input.

Drawing pictures will help a lot with this one. Grab some paper and pencil (or a whiteboard, if you have one). */

function findDuplicate(intArray) {
  let arrLen = intArray.length;
  let lastElem = arrLen - 1;
  let currNode = intArray[lastElem];
  let cycleEnd = cycleStart = index = 0;
  // while (index < intArray.length) {
  for (let i = 0; i < arrLen; i++) {
    currNode = intArray[currNode];
  }

  let recallPosition = intArray[currNode + 1];
  let cycleCounter = 1;
  while (currNode !== recallPosition) {
    cycleCounter++;
  }
}

// function findDuplicate(intArray) {
//   // Find a number that appears more than once ... in O(n) time
//   let haveSeen = new Set();
//   let index = 0;
//   let currVal = intArray[index];
//   while (index < intArray.length) {
//     if (haveSeen.has(intArray[index])) {
//       return intArray[index]
//     } else {
//       haveSeen.add(currVal)
//       currVal = intArray[currVal];
//     }
//     index++;
//   }
// }
















// Tests

let desc = 'just the repeated number';
let actual = findDuplicate([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findDuplicate([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findDuplicate([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findDuplicate([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}