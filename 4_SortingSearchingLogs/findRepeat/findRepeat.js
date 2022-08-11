/* Find a duplicate, Space Edition™.

We have an array of integers, where:

The integers are in the range 1...n
The array has a length of n + 1
It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.

Write a function which finds an integer that appears more than once in our array. Don't modify the input! (If there are multiple duplicates, you only need to find one of them.)

We're going to run this function on our new, super-hip MacBook Pro With Retina Display™. Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM. So we need to optimize for space! */

function findRepeat(numbers) {
  let floor = 1; // lowest possible value
  let ceil = numbers.length - 1; // highest possible value. duplicate is somewhere in between

  while (floor < ceil) {
    let mid = Math.floor(floor + (ceil - floor) / 2);
    let lowFloor = floor;
    let lowCeil = mid;
    let highFloor = mid + 1;
    let highCeil = ceil;
    let uniqPossibleIntsInLow = lowCeil - lowFloor + 1;
    let itemsInLow = 0;
    for (let num of numbers) {
      if (num >= lowFloor && num <= lowCeil) {
        itemsInLow++;
      }
    }
    if (itemsInLow > uniqPossibleIntsInLow) {
      floor = lowFloor;
      ceil = lowCeil;
    } else {
      floor = highFloor;
      ceil = highCeil;
    }
  }
  return floor;
}

// function findRepeat(numbers) {
//   let copy = numbers.slice();
//   copy.sort();
//   let ind = 0;
//   while(ind < copy.length) {
//     if (copy[ind] === copy[ind + 1]) {
//       return copy[ind];
//     }
//     ind++;
//   }
// }


















// Tests

let desc = 'just the repeated number';
let actual = findRepeat([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findRepeat([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findRepeat([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findRepeat([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}