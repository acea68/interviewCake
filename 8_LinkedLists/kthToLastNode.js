/* You have a linked list and want to find the kth to last node.

Write a function kthToLastNode() that takes an integer k and the headNode of a singly-linked list, and returns the kth to last node in the list.

For example:

  class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new LinkedListNode('Angel Food');
const b = new LinkedListNode('Bundt');
const c = new LinkedListNode('Cheese');
const d = new LinkedListNode("Devil's Food");
const e = new LinkedListNode('Eccles');

a.next = b;
b.next = c;
c.next = d;
d.next = e;

kthToLastNode(2, a);
// Returns the node with value "Devil's Food" (the 2nd to last node) */

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function kthToLastNode(k, head) {
  if (k < 1) {
    throw new Error(`Impossible to find less than first to last node: ${k}`);
  }
  let front = kth = head;
  for (let i = 0; i < k; i++) {
    front = front.next;
  }
  while (front) {
    kth = kth.next;
    front = front.next;
  }
  return kth;
}

// function kthToLastNode(k, head) {

//   if (k < 1) {
//     throw new Error(`Impossible to find less than first to last node: ${k}`);
//   }

//   // STEP 1: get the length of the list
//   // Start at 1, not 0
//   // else we'd fail to count the head node!
//   let listLength = 1;
//   let currentNode = head;

//   // Traverse the whole list,
//   // counting all the nodes
//   while (currentNode.next) {
//     currentNode = currentNode.next;
//     listLength += 1;
//   }

//   // If k is greater than the length of the list, there can't
//   // be a kth-to-last node, so we'll return an error!
//   if (k > listLength) {
//     throw new Error(`k is larger than the length of the linked list: ${k}`);
//   }

//   // STEP 2: walk to the target node
//   // Calculate how far to go, from the head,
//   // to get to the kth to last node
//   const howFarToGo = listLength - k;

//   currentNode = head;
//   for (let i = 0; i < howFarToGo; i++) {
//     currentNode = currentNode.next;
//   }

//   return currentNode;
// }

// function kthToLastNode(k, head) {
//   let prev = next = null;
//   let curr = head;
//   while(curr) {
//     next = curr.next;
//     curr.next = prev;
//     prev = curr;
//     curr = next;
//   }
//   // let count = 0;
//   // while(count <= k) {
//   //   prev = prev.next;
//   //   k++;
//   // }
//   return prev;
// }


















// Tests

let desc = 'first to last node';
let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
let actual = kthToLastNode(1, nodes[0]);
let expected = nodes[3];
assertEquals(actual, expected, desc);

desc = 'second to last node';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(2, nodes[0]);
expected = nodes[2];
assertEquals(actual, expected, desc);

desc = 'first node';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(4, nodes[0]);
expected = nodes[0];
assertEquals(actual, expected, desc);

desc = 'k greater than linked list length';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const fifthFromLast = () => (kthToLastNode(5, nodes[0]));
assertThrows(fifthFromLast, desc);

desc = 'k is zero';
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const zeroFromLast = () => (kthToLastNode(0, nodes[0]));
assertThrows(zeroFromLast, desc);

function valuesToLinkedListNodes(values) {
  const nodes = [];
  for (let i = 0; i < values.length; i++) {
    const node = new LinkedListNode(values[i]);
    if (i > 0) {
      nodes[i - 1].next = node;
    }
    nodes.push(node);
  }
  return nodes;
}

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}

function assertThrows(func, desc) {
  try {
    func();
    console.log(`${desc} ... FAIL`);
  } catch (e) {
    console.log(`${desc} ... PASS`);
  }
}