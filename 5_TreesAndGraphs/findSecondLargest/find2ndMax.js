/* Write a function to find the 2nd largest element in a binary search tree. ↴

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
    this.left  = null;
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

function findSecondLargest(treeRoot) {
  // Find the second largest item in the binary search tree
  if (!treeRoot || (!treeRoot.left && !treeRoot.right)) throw new Error('Please provide at least two valid nodes.');
  while(treeRoot) {
    if (treeRoot.left && !treeRoot.right) {
      return findLargest(treeRoot.left);
    }
    if (treeRoot.right && !treeRoot.right.left && !treeRoot.right.right) {
      return treeRoot.value;
    }
    treeRoot = treeRoot.right;
  }
}
function findLargest(root) {
  while(root){
    if (!root.right) return root.value
    root = root.right;
  }
}
















// Tests
let desc, treeRoot, leftNode, rightNode;
desc = 'full tree';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
rightNode = treeRoot.insertRight(70);
rightNode.insertLeft(60);
rightNode.insertRight(80);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 70, desc);

desc = 'largest has a left child';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
rightNode = treeRoot.insertRight(70);
rightNode.insertLeft(60);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 60, desc);

desc = 'largest has a left subtree';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
rightNode = treeRoot.insertRight(70);
leftNode = rightNode.insertLeft(60);
leftNode.insertRight(65);
leftNode = leftNode.insertLeft(55);
leftNode.insertRight(58);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 65, desc);

desc = 'second largest is root node';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
rightNode = treeRoot.insertRight(70);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 50, desc);

desc = 'two nodes root is largest';
treeRoot = new BinaryTreeNode(50);
treeRoot.insertLeft(30);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 30, desc);

desc = 'second largest in right offshoot left subtree';
treeRoot = new BinaryTreeNode(50)
leftNode = treeRoot.insertLeft(30)
leftNode.insertRight(40)
leftNode.insertLeft(10)
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 40, desc);

desc = 'descending linked list';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(40);
leftNode = leftNode.insertLeft(30);
leftNode = leftNode.insertLeft(20);
leftNode = leftNode.insertLeft(10);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 40, desc);

desc = 'ascending linked list';
treeRoot = new BinaryTreeNode(50);
rightNode = treeRoot.insertRight(60);
rightNode = rightNode.insertRight(70);
rightNode = rightNode.insertRight(80);
// console.log(findLargest(treeRoot));
assertEquals(findSecondLargest(treeRoot), 70, desc);

desc = 'one node tree';
treeRoot = new BinaryTreeNode(50);
// console.log(findLargest(treeRoot));
assertThrowsError(() => findSecondLargest(treeRoot), desc);

desc = 'when tree is empty';
treeRoot = null;
// console.log(findLargest(treeRoot));
assertThrowsError(() => findSecondLargest(treeRoot), desc);

function assertEquals(a, b, desc) {
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