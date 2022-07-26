/* Writing programming interview questions hasn't made me rich yet ... so I might give up and start trading Apple stocks all day instead.

First, I wanna know how much money I could have made yesterday if I'd been trading Apple stocks all day.

So I grabbed Apple's stock prices from yesterday and put them in an array called stockPrices, where:

The indices are the time (in minutes) past trade opening time, which was 9:30am local time.
The values are the price (in US dollars) of one share of Apple stock at that time.
So if the stock cost $500 at 10:30am, that means stockPrices[60] = 500.

Write an efficient function that takes stockPrices and returns the best profit I could have made from one purchase and one sale of one share of Apple stock yesterday.

For example:

  const stockPrices = [10, 7, 5, 8, 11, 9];

getMaxProfit(stockPrices);
// Returns 6 (buying for $5 and selling for $11)

JavaScript
No "shorting"—you need to buy before you can sell. Also, you can't buy and sell in the same time step—at least 1 minute has to pass. */

function getMaxProfit(stockPrices) { // SOLN
  if (stockPrices.length < 2) throw new Error('Please provide at least two valid stock prices.');
  let min = stockPrices[0];
  let maxProfit = stockPrices[1] - min;
  for (let i = 1; i < stockPrices.length; i++) {
    let potProfit = stockPrices[i] - min;
    maxProfit = Math.max(maxProfit, potProfit);
    min = Math.min(min, stockPrices[i]);
  }
  return maxProfit;
}

// function getMaxProfit(stockPrices) { // SOLN w/while loop
//   if (stockPrices.length < 2) throw new Error('Please provide at least two valid stock prices.');
// let min = stockPrices[0];
// let maxProfit = stockPrices[1] - min;
// let i = 1;
//   while(i < stockPrices.length) {
//     let potProfit = stockPrices[i] - min;
//     maxProfit = Math.max(maxProfit, potProfit);
//     min = Math.min(min, stockPrices[i]);
//     i++;
//   }
//   return maxProfit;
// }

// function getMaxProfit(stockPrices) {
//   if (!stockPrices.length || stockPrices.length === 1) throw new Error('Please provide at least two valid stock prices.');
//   let min = stockPrices[0];
//   let max = stockPrices[1];
//   let minInd = 0;
//   let index = maxInd = 1;
//   let profit = max - min;
//   while(index < stockPrices.length) {
//     if (stockPrices[index] > max) {
//       if (index > minInd) {
//         max = stockPrices[index];
//         maxInd = index;
//         profit = Math.max(profit, max - min);
//       }
//     }
//     if (stockPrices[index] < min) {
//       if (minInd < maxInd) {
//         min = stockPrices[index];
//         minIndex = index;
//       }
//     }
//     index++;
//   }
//   return profit;
// }

























// Tests


let desc = 'price goes up then down';
let actual = getMaxProfit([1, 5, 3, 2]);
let expected = 4;
assertEqual(actual, expected, desc);

desc = 'price goes down then up';
actual = getMaxProfit([7, 2, 8, 9]);
expected = 7;
assertEqual(actual, expected, desc);

desc = 'big increase then small increase';
actual = getMaxProfit([2, 10, 1, 4]);
expected = 8;
assertEqual(actual, expected, desc);

desc = 'price goes up all day';
actual = getMaxProfit([1, 6, 7, 9]);
expected = 8;
assertEqual(actual, expected, desc);

desc = 'price goes down all day';
actual = getMaxProfit([9, 7, 4, 3]);
expected = -1;
assertEqual(actual, expected, desc);

desc = 'price stays the same all day';
actual = getMaxProfit([1, 1, 1, 1]);
expected = 0;
assertEqual(actual, expected, desc);

desc = 'price goes down then up then down the up';
actual = getMaxProfit([10, 7, 5, 8, 11, 2, 12]);
expected = 10;
assertEqual(actual, expected, desc);

desc = 'error with empty prices';
const emptyArray = () => (getMaxProfit([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one price';
const onePrice = () => (getMaxProfit([1]));
assertThrowsError(onePrice, desc);

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