/* You're working on a secret team solving coded transmissions.

Your team is scrambling to decipher a recent message, worried it's a plot to break into a major European National Cake Vault. The message has been mostly deciphered, but all the words are backward! Your colleagues have handed off the last step to you.

Write a function reverseWords() that takes a message as an array of characters and reverses the order of the words in place. ↴

Why an array of characters instead of a string?

The goal of this question is to practice manipulating strings in place. Since we're modifying the message, we need a mutable ↴ type like an array, instead of JavaScript's immutable strings.

For example:

  const message = [ 'c', 'a', 'k', 'e', ' ',
                'p', 'o', 'u', 'n', 'd', ' ',
                's', 't', 'e', 'a', 'l' ];

reverseWords(message);

console.log(message.join(''));
// Prints: 'steal pound cake'

JavaScript
When writing your function, assume the message contains only letters and spaces, and all words are separated by one space. */

function reverseWords(mes) {
  revChars(mes);
  let left = 0;
  for (let right = 0; right < mes.length; right++) {
    if (mes[right + 1] === ' ' || right + 1 === mes.length) {
      revChars(mes, left, right);
      right++;
      left = right + 1;
    }
  }
  return mes;
}

function revChars(string, left = 0, right = string.length - 1) {
  while (left < right) {
    let temp = string[left];
    string[left] = string[right];
    string[right] = temp;
    left++;
    right--;
  }
}

// function reverseWords1(message) {
//   let mes = message.join('').split(' ');
//   for (let i = 0; i < Math.floor(mes.length / 2); i++) {
//     let temp = mes[i];
//     mes[i] = mes[mes.length - 1 - i];
//     mes[mes.length - 1 - i] = temp;
//   }
//   return mes.join(' ');
// }

//              0    1    2    3         5         7         9
// var message = ['c', 'a', 'k', 'e', ' ', 'p', 'o', 'u', 'n', 'd', ' ', 's', 't', 'e', 'a', 'l'];
// ['l', 'a', 'e', 't', 's', ' ', 'd', 'n', 'u', 'o', 'p', ' ', 'e', 'k', 'a', 'c'];
// let result = reverseWords(message);
// console.log('🚀 ~ result', result);


var message = [ 't', 'h', 'e', ' ', 'e', 'a', 'g', 'l', 'e', ' ',
  'h', 'a', 's', ' ', 'l', 'a', 'n', 'd', 'e', 'd' ];
let result1 = reverseWords(message);
console.log('🚀 ~ result', result1);

// var message = ['1','2','3',' ','4','5',' ','6','7','8','9'];
// let result1 = reverseWords(message);
// console.log('🚀 ~ result', result1);



