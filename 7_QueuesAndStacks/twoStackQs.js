/* Implement a queue ↴ with 2 stacks. ↴ Your queue should have an enqueue and a dequeue method and it should be "first in first out" (FIFO).

Optimize for the time cost of mm calls on your queue. These can be any mix of enqueue and dequeue calls.

Assume you already have a stack implementation and it gives O(1)O(1) time push and pop. */

class Stack {
  constructor() {
    this.stack = [];
  }
  push(value) {
    this.stack.push(value);
  }
  pop() {
    if (this.stack.length) return this.stack.pop();
    return null;
  }
  peek() {
    if (this.stack.length) return this.stack[this.stack.length - 1];
    return null;
  }
  length() {
    return this.stack.length;
  }
}

//  Implement the enqueue and dequeue methods
class QueueTwoStacks {
  constructor() {
    this.q1 = new Stack();
    this.q2 = new Stack();
  }
  enqueue(item) {
    this.q1.push(item);
  }

  dequeue() {
    if (this.q2.length() === 0) {
      // Move items from q1 to q2, reversing order
      while (this.q1.length() > 0) {
        this.q2.push(this.q1.pop());
      }
      // If q2 is still empty, raise an error
      if (this.q2.length() === 0) {
        throw new Error('Cannot dequeue empty queue.');
      }
    }
    return this.q2.pop();
  }
  // dequeue() {
  //   if (!this.q1.length()) throw new Error('Cannot dequeue empty queue.');
  //   while(this.q1.length()) {
  //     this.q2.push(this.q1.pop());
  //   }
  //   let result = this.q2.pop();
  //   while(this.q2.length()) {
  //     this.q1.push(this.q2.pop());
  //   }
  //   return result;
  // }
}



// Tests
const q = new QueueTwoStacks();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

let desc = 'dequeue #1';
let actual = q.dequeue();
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'dequeue #2';
actual = q.dequeue();
expected = 2;
assertEquals(actual, expected, desc);

q.enqueue(4);

desc = 'dequeue #3';
actual = q.dequeue();
expected = 3;
assertEquals(actual, expected, desc);

desc = 'dequeue #4';
actual = q.dequeue();
expected = 4;
assertEquals(actual, expected, desc);

desc = 'dequeue from empty queue';
const emptyDequeue = () => q.dequeue();
assertThrowsError(emptyDequeue, desc);

function assertEquals(a, b, desc) {
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