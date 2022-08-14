/* Write a function to check that a binary tree ↴ is a valid binary search tree. */

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
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
  if (!treeRoot || (!treeRoot.left && !treeRoot.right)) return true;
  let stack = [];
  let min = -Infinity;
  let max = Infinity;
  stack.push([treeRoot, min, max]);
  while (stack.length) {
    let [node, min, max] = stack.pop();
    if (node.value <= min || node.value >= max) return false;
    if (node.left) {
      stack.push([node.left, min, node.value]);
    }
    if (node.right) {
      stack.push([node.right, node.value, max]);
    }
  }
  return true;
}

// function isBinarySearchTree(treeRoot) {
//   // Determine if the tree is a valid binary search tree
//   if (!treeRoot || (!treeRoot.left && !treeRoot.right)) return true;
//   let stack = [];
//   let min = -Infinity;
//   let max = Infinity;
//   stack.push([treeRoot, min, max]);
//   while (stack.length) {
//     let [node, min, max] = stack.pop();
//     if (node.right) {
//       if (node.right.value > node.value && node.right.value < max) {
//         stack.push([node.right, node.value, max]);
//       } else { return false }
//     }
//     if (node.left) {
//       if (node.left.value < node.value && node.left.value > min) {
//         stack.push([node.left, min, node.value]);
//       } else { return false }
//     }
//   }
//   return true;
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

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}