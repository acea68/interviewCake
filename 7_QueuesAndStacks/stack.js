/* You want to be able to access the largest element in a stack. ↴

You've already implemented this Stack class:

  class Stack {
  constructor() {

    // Initialize an empty stack
    this.items = [];
  }

  // Push a new item onto the stack
  push(item) {
    this.items.push(item);
  }

  // Remove and return the last item
  pop() {

    // If the stack is empty, return null
    // (It would also be reasonable to throw an exception)
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }

  // Returns the last item without removing it
  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}
JavaScript
Use your Stack class to implement a new class MaxStack with a method getMax() that returns the largest element in the stack. getMax() should not remove the item.

Your stacks will contain only integers. */

// Implement the push, pop, and getMax methods

// AHEAD-OF-TIME APPROACH
// O(1) for getMax()
// optimizes getMax()
class MaxStack {
  constructor() {
    this.list = new Stack();
    this.stackOfMaxes = new Stack();
  }

  push(item) {
    this.list.push(item)
    if (this.stackOfMaxes.size() === 0 ||
      item >= this.stackOfMaxes.peek()) this.stackOfMaxes.push(item);
  }

  pop() {
    let temp = this.list.pop();
    if (this.stackOfMaxes.peek() === temp) this.stackOfMaxes.pop();
    return temp;
  }

  getMax() { // O(1) for getMax()
    return this.stackOfMaxes.peek();
  }
}

// JUST-IN-TIME APPROACH
// O(n) for getMax and O(1) push/pop
// optimizes push & pop
class MaxStack {
  constructor() {
    this.list = new Stack();
  }

  push(item) { // O(1)
    this.list.push(item)
  }

  pop() { // O(1)
    return this.list.pop();
  }

  getMax() { // O(n) for getMax()
    let tempStack = new Stack();
    let max = this.list.peek();
    if (!max) {
      // throw new Error('Stack is empty.');
      console.log('Stack is empty.');
    }
    while (this.list.size()) {
      let tempVal = this.list.pop();
      max = Math.max(max, tempVal);
      tempStack.push(tempVal);
    }
    while (tempStack.size()) {
      this.list.push(tempStack.pop());
    }
    return max;
  }
}
//GY
// class MaxStack {
//   constructor() {
//     this.list = new Stack();
//   }

//   push(item) {
//     this.list.push(item)
//   }

//   pop() {
//     return this.list.pop();
//   }

//   getMax() {
//     let max = this.list.peek();
//     while (this.list.length) {
//       if (max) {
//         max = Math.max(max, this.list.push(this.list.pop()));
//       }
//     }
//     return max;
//   }
// }

class Stack {
  constructor() {
    this.stack = [];
  }
  push(item) {
    this.stack.push(item);
  }
  pop() {
    if (this.stack.length) return this.stack.pop();
    return null;
  }
  peek() {
    if (this.stack.length) return this.stack[this.stack.length - 1]
    return null;
  }
  size() {
    return this.stack.length;
  }
}

// Tests

const s = new MaxStack();
s.push(5);

assertEquals(5, s.getMax(), 'check max after 1st push');

s.push(4);
s.push(7);
s.push(7);
s.push(8);

assertEquals(8, s.getMax(), 'check before 1st pop');
assertEquals(8, s.pop(), 'check pop #1');
assertEquals(7, s.getMax(), 'check max after 1st pop');
assertEquals(7, s.pop(), 'check pop #2');
assertEquals(7, s.getMax(), 'check max after 2nd pop');
assertEquals(7, s.pop(), 'check pop #3');
assertEquals(5, s.getMax(), 'check max after 3rd pop');
assertEquals(4, s.pop(), 'check pop #4');
assertEquals(5, s.getMax(), 'check max after 4th pop');

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}