/* Write a function for doing an in-place ↴ shuffle of an array.

The shuffle must be "uniform," meaning each item in the original array must have the same probability of ending up in each spot in the final array.

Assume that you have a function getRandom(floor, ceiling) for getting a random integer that is >= floor and <= ceiling. */

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let randInd = getRandom(0, array.length - 1);
    if (i !== randInd) {
      let tempVal = array[i];
      array[i] = array[randInd];
      array[randInd] = tempVal;
    }
  }
  return array;
}


const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
shuffle(sample);
console.log('Shuffled array: ', sample);