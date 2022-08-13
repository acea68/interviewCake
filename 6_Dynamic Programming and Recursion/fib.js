/* Write a function fib() that takes an integer n and returns the nth Fibonacci ↴ number.

Let's say our Fibonacci series is 0-indexed and starts with 0. So:

  fib(0);  // => 0
fib(1);  // => 1
fib(2);  // => 1
fib(3);  // => 2
fib(4);  // => 3
... */

console.time('fib');
function fib(n) {
  // Compute the nth Fibonacci number
  if (n < 0) throw new Error('Cannot compute negative numbers.')
  if (n === 1 || n === 0) return n
  return fib(n - 1) + fib(n - 2);
}
console.timeEnd('fib');

// console.time('fib2');
// class Fibonacci {
//   constructor() {
//     this.memo = {};
//   }
//   fib(n) {
//     if (n < 0) throw new Error('Cannot compute negative numbers.')
//     if (n === 1 || n === 0) return n
//     if (this.memo[n]) {
//       return this.memo[n];
//     }
//     let result = this.fib(n - 1) + this.fib(n - 2);
//     this.memo[n] = result;
//     return result;
//   }
// }
// console.timeEnd('fib2');

// console.time('fib3');
// function fib(n) {
//   if (n < 0) throw new Error('Please only provide positive numbers.');
//   if (n === 0 || n === 1) return n;
//   let prev2 = 0;
//   let prev = 1;
//   let curr;
//   for (let i = 1; i < n; i++) {
//     curr = prev + prev2;
//     prev2 = prev;
//     prev = curr;
//   }
//   return curr;
// }
// console.timeEnd('fib3');













// Tests
let desc, actual, expected, res;
desc = 'zeroth fibonacci';
actual = fib(0);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'first fibonacci';
actual = fib(1);
expected = 1;
assertEqual(actual, expected, desc);

// desc = 'second fibonacci';
// actual = fib(2);
// expected = 1;
// assertEqual(actual, expected, desc);

// desc = 'third fibonacci';
// actual = fib(3);
// expected = 2;
// assertEqual(actual, expected, desc);

// desc = 'fifth fibonacci';
// actual = fib(5);
// expected = 5;
// assertEqual(actual, expected, desc);

// desc = 'tenth fibonacci';
// actual = fib(10);
// expected = 55;
// assertEqual(actual, expected, desc);

// desc = 'negative fibonacci';
// const negativeFib = () => (fib(-1));
// assertThrowsError(negativeFib, desc);

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