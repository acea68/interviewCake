/* Write a recursive function for generating all permutations of an input string. Return them as a set.

Don't worry about time or space complexity—if we wanted efficiency we'd write an iterative version.

To start, assume every character in the input string is unique.

Your function can have loops—it just needs to also be recursive. */

function getPermutations(string) {

  // Base case
  if (string.length <= 1) {
    return new Set([string]);
  }

  const allCharsExceptLast = string.slice(0, -1);
  const lastChar = string[string.length - 1];
  // console.log('🚀 ~ lastChar', lastChar);

  // Recursive call: get all possible permutations for all chars except last
  const collectionPermutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast); // returns a set of perms
  // console.log('🚀 ~ collectionPermutationsOfAllCharsExceptLast', collectionPermutationsOfAllCharsExceptLast);

  // Put the last char in all possible positions for each of the above permutations
  const permutations = new Set();
  collectionPermutationsOfAllCharsExceptLast.forEach(singlePermutationOfAllCharsExceptLast => {
    // console.log('🚀 ~ singlePermutationOfAllCharsExceptLast', singlePermutationOfAllCharsExceptLast);
    permGen(singlePermutationOfAllCharsExceptLast, lastChar, permutations);
  });
  return permutations;
}

function permGen(acel, lastChar, permutations) { // AllCharsExceptLast, lastCharacter, perms Set()
  for (let i = 0; i <= acel.length; i++) {
    let combo = acel.slice(0,i) + lastChar + acel.slice(i);
    // console.log('🚀 ~ combo', combo);
    permutations.add(combo);
  }
}

// console.log(permGen('cat', 's'));
// console.log(getPermutations('cats'));








// Tests
let desc, input, actual, expected;
desc = 'empty string';
input = '';
actual = getPermutations(input);
expected = new Set(['']);
assert(isSetsEqual(actual, expected), desc);

desc = 'one character string';
input = 'a';
actual = getPermutations(input);
expected = new Set(['a']);
assert(isSetsEqual(actual, expected), desc);

desc = 'two character string';
input = 'ab';
actual = getPermutations(input);
expected = new Set(['ab', 'ba']);
assert(isSetsEqual(actual, expected), desc);

desc = 'three character string';
input = 'abc';
actual = getPermutations(input);
expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
  if (as.size !== bs.size) {
    return false;
  }
  for (let a of as) {
    if (!bs.has(a)) return false;
  }
  return true;
}

function assert(condition, desc) {
  if (condition) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL`);
  }
}