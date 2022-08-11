/* Write a function to check that a binary tree ↴ is a valid binary search tree. ↴

Here's a sample binary tree node class:

  class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
} */

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}


function isBinarySearchTree(treeRoot) {
  // Determine if the tree is a valid binary search tree
  let stack = [];
  stack.push([treeRoot, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]); // [node, lowerBound, upperBound]
  while (stack.length) {
    [node, min, max] = stack.pop();
    if (node.value <= min || node.value >= max) return false;
    if (node.right) {
      stack.push([node.right, node.value, max]);
    }
    if (node.left) {
      stack.push([node.left, min, node.value]);
    }
  }
  return true;
}

// function isBinarySearchTree(treeRoot) {
//   // Determine if the tree is a valid binary search tree
//   let stack = [];
//   stack.push(treeRoot);
//   while (stack.length) {
//     let node = stack.pop();
//     if (node.right) {
//       if (node.right.value < node.value || (node.right.left && node.right.left.value < node.value)) return false;
//       stack.push(node.right);
//     }
//     if (node.left) {
//       if (node.left.value > node.value || (node.left.right && node.left.right.value > node.value)) return false;
//       stack.push(node.left);
//     }
//   }
//   return true;
// }

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////SOLUTIONS///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
// function isBinarySearchTree(treeRoot) {
//   // Start at the root, with an arbitrarily low lower bound
//   // and an arbitrarily high upper bound
//   const nodeAndBoundsStack = [];
//   nodeAndBoundsStack.push({
//     node: treeRoot,
//     lowerBound: Number.NEGATIVE_INFINITY,
//     upperBound: Number.POSITIVE_INFINITY,
//   });
//   // Depth-first traversal
//   while (nodeAndBoundsStack.length) {
//     const { node, lowerBound, upperBound } = nodeAndBoundsStack.pop();
//     // If this node is invalid, we return false right away
//     if (node.value <= lowerBound || node.value >= upperBound) {
//       return false;
//     }
//     if (node.left) {
//       // This node must be less than the current node
//       nodeAndBoundsStack.push({
//         node: node.left,
//         lowerBound,
//         upperBound: node.value,
//       });
//     }
//     if (node.right) {
//       // This node must be greater than the current node
//       nodeAndBoundsStack.push({
//         node: node.right,
//         lowerBound: node.value,
//         upperBound,
//       });
//     }
//   }
//   // If none of the nodes were invalid, return true
//   // (At this point we have checked all nodes)
//   return true;
// }

// function isBinarySearchTree(treeRoot, lowerBound, upperBound) {
//   lowerBound = (typeof lowerBound !== 'undefined') ? lowerBound : Number.NEGATIVE_INFINITY;
//   upperBound = (typeof upperBound !== 'undefined') ? upperBound : Number.POSITIVE_INFINITY;

//   if (!treeRoot) return true;

//   if (treeRoot.value >= upperBound || treeRoot.value <= lowerBound) {
//     return false;
//   }

//   return isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value)
//     && isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound);
// }













// Tests

let desc = 'valid full tree';
let treeRoot = new BinaryTreeNode(50);
let leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
let rightNode = treeRoot.insertRight(70);
rightNode.insertLeft(60);
rightNode.insertRight(80);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

desc = 'both subtrees valid';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(20);
leftNode.insertRight(60);
rightNode = treeRoot.insertRight(80);
rightNode.insertLeft(70);
rightNode.insertRight(90);
assertEquals(isBinarySearchTree(treeRoot), false, desc);

desc = 'descending linked list';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(40);
leftNode = leftNode.insertLeft(30);
leftNode = leftNode.insertLeft(20);
leftNode = leftNode.insertLeft(10);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

desc = 'out of order linked list';
treeRoot = new BinaryTreeNode(50);
rightNode = treeRoot.insertRight(70);
rightNode = rightNode.insertRight(60);
rightNode = rightNode.insertRight(80);
assertEquals(isBinarySearchTree(treeRoot), false, desc);

desc = 'one node tree';
treeRoot = new BinaryTreeNode(50);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

desc = 'contains linked list';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(20);
let chain = leftNode.insertRight(40);
chain = chain.insertRight(41);
chain = chain.insertRight(42);
chain = chain.insertRight(51);
rightNode = treeRoot.insertRight(80);
rightNode.insertLeft(70);
rightNode.insertRight(90);
assertEquals(isBinarySearchTree(treeRoot), false, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}