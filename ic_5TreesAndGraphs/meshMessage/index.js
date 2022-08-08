/* You wrote a trendy new messaging app, MeshMessage, to get around flaky cell phone coverage.

Instead of routing texts through cell towers, your app sends messages via the phones of nearby users, passing each message along from one phone to the next until it reaches the intended recipient. (Don't worry—the messages are encrypted while they're in transit.)

Some friends have been using your service, and they're complaining that it takes a long time for messages to get delivered. After some preliminary debugging, you suspect messages might not be taking the most direct route from the sender to the recipient.

Given information about active users on the network, find the shortest route for a message from one user (the sender) to another (the recipient). Return an array of users that make up this route.

There might be a few shortest delivery routes, all with the same length. For now, let's just return any shortest route.

Your network information takes the form of an object where keys are usernames and values are arrays of other users nearby:

  const network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
  ...
};

For the network above, a message from Jayden to Adam should have this route:

  ['Jayden', 'Amelia', 'Adam'] */

// A simple, somewhat inefficient queue implementation
class Queue {
  constructor() {
    this.queue = [];
    this.size = 0;
  }

  enqueue(item) {
    this.queue.unshift(item);
    this.size += 1;
  }

  dequeue() {
    this.size -= 1;
    return this.queue.pop();
  }
}


function getPath(graph, startNode, endNode) {
  if (!graph[startNode] || !graph[endNode]) throw new Error('Please provide valid start and end nodes.');
  if (startNode === endNode) return [startNode];
  let result = []; // array

  let nodesToVisit = new Queue(); // {'queue': array, 'size': int}
  nodesToVisit.enqueue(startNode); // unshift (add) to front

  let haveSeen = new Set(startNode); // set

  while (!!nodesToVisit.queue.length) {
    let currNode = nodesToVisit.dequeue(); // pop (remove) from back
    result.push(currNode); // potential node connecting to endNode
    haveSeen.add(currNode);
    // adds neighbors to nodesToVisit queue
    for (let neighbor of graph[currNode]) {
      if (!haveSeen.has(neighbor)) nodesToVisit.enqueue(neighbor);
    }

    if (nodesToVisit.queue.indexOf(endNode) !== -1) {
      result.push(endNode)
      return result;
    }
    if (result[result.length - 1] !== startNode) result.pop();
  }
  return null;
}

// function getPath(graph, startNode, endNode) {
//   // Find the shortest route in the network between the two users
//   // add startNode to queue & result array
//   // pop first node to analyze: iterate thru startNode's neighbors, check to see if endNode is included
//   // if not, add each neighbor to queue
//   // as each neighbor is analyzed, add to result array
//   // if endNode is not found in neighbor node analysis, remove from result array
//   // repeat process until you find endNode
//   if (!graph[startNode] || !graph[endNode]) throw new Error('Please provide valid start and end nodes.');
//   let result = [startNode]; // array
//   let nodes = new Queue(); // {'queue': array, 'size': int}
//   let haveSeen = new Set(startNode); // set
//   for (let startingNeighbor of graph[startNode]) {
//     nodes.enqueue(startingNeighbor);
//     haveSeen.add(startingNeighbor);
//   }

//   while (nodes.queue.indexOf(endNode) === -1) {

//     result.push(node); // potential node connecting to endNode

//     for (let neighbor of graph[node]) {
//       if (indexOf(result[neighbor]) < 0) {
//         result.push(neighbor); // potential connection
//         queue.add(neighbor)
//         if (queue.has(endNode)) {
//           result.push(endNode)
//           return result;
//         }
//         result.pop(); // if you reach here, endNode was not found.
//       }
//       // remove from result & queue
//     }
//   }

//   if (nodes.queue.indexOf(endNode) !== -1) {
//     result.push(endNode)
//     return result;
//   }
//   return null;
// }







// Tests
const graph = {
  'a': ['b', 'c', 'd'],
  'b': ['a', 'd'],
  'c': ['a', 'e'],
  'd': ['a', 'b'],
  'e': ['c'],
  'f': ['g'],
  'g': ['f']
};

let desc = 'two hop path 1';
let actual = getPath(graph, 'a', 'e');
let expected = ['a', 'c', 'e'];
assertDeepEqual(actual, expected, desc);

desc = 'two hop path 2';
actual = getPath(graph, 'd', 'c');
expected = ['d', 'a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 1';
actual = getPath(graph, 'a', 'c');
expected = ['a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 2';
actual = getPath(graph, 'f', 'g');
expected = ['f', 'g'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 3';
actual = getPath(graph, 'g', 'f');
expected = ['g', 'f'];
assertDeepEqual(actual, expected, desc);

desc = 'zero hop path';
actual = getPath(graph, 'a', 'a');
expected = ['a'];
assertDeepEqual(actual, expected, desc);

desc = 'no path';
actual = getPath(graph, 'a', 'f');
expected = null;
assertDeepEqual(actual, expected, desc);

desc = 'start node not present';
assertThrowsError(() => {
  getPath(graph, 'h', 'a');
}, desc);

desc = 'end node not present';
assertThrowsError(() => {
  getPath(graph, 'a', 'h');
}, desc);

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
  } else {
    console.log(`${desc} ... PASS`);
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