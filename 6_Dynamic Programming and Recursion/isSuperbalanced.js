/* Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).

A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one. */

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

function isBalanced(treeRoot) {

  // Determine if the tree is superbalanced
  if (!treeRoot) throw new Error('Provide valid root.');
  let stack = [];
  let height = 1;
  let maxHeight, minHeight;
  let leafHeights = new Set();
  stack.push([treeRoot, height])
  while (stack.length) {
    let [currNode, height] = stack.pop();
    if (currNode.right) stack.push([currNode.right, height + 1]);
    if (currNode.left) stack.push([currNode.left, height + 1]);
    if (!currNode.right && !currNode.left) {
      leafHeights.add(height);
      if (leafHeights.size > 2) {
        return false
      } else if (leafHeights.size === 2) {
        let [first, second] = leafHeights;
        if (Math.abs(first - second) > 1) return false;
      }
    }
  }
  return true;
}

// function isBalanced(treeRoot) {

//   // Determine if the tree is superbalanced
//   if (!treeRoot) throw new Error('Provide valid root.');
//   let stack = [];
//   let height = 1;
//   let maxHeight, minHeight;
//   let leafHeights = new Set();
//   stack.push([treeRoot, height])
//   while (stack.length) {
//     let [currNode, height] = stack.pop();
//     if (currNode.right) stack.push([currNode.right, height + 1]);
//     if (currNode.left) stack.push([currNode.left, height + 1]);
//     if (!currNode.right && !currNode.left) {
//       leafHeights.add(height);
//       if (!minHeight) {
//         minHeight = height;
//       } else {
//         Math.min(minHeight, height)
//       }
//       if (!maxHeight) {
//         maxHeight = height;
//       } else  {
//         maxHeight = Math.max(maxHeight, height)
//       }
//     }
//     if (leafHeights.size > 2 || maxHeight - minHeight > 1) return false
//   }
//   return true;
// }


// Tests
let desc, treeRoot, leftNode, rightNode;
desc = 'full tree';
treeRoot = new BinaryTreeNode(5);
leftNode = treeRoot.insertLeft(8);
leftNode.insertLeft(1);
leftNode.insertRight(2);
rightNode = treeRoot.insertRight(6);
rightNode.insertLeft(3);
rightNode.insertRight(4);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'both leaves at the same depth';
treeRoot = new BinaryTreeNode(3);
leftNode = treeRoot.insertLeft(4);
leftNode.insertLeft(1);
rightNode = treeRoot.insertRight(6);
rightNode.insertRight(9);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'leaf heights differ by one';
treeRoot = new BinaryTreeNode(6);
leftNode = treeRoot.insertLeft(1);
rightNode = treeRoot.insertRight(0);
rightNode.insertRight(7);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'leaf heights differ by two';
treeRoot = new BinaryTreeNode(6);
leftNode = treeRoot.insertLeft(1);
rightNode = treeRoot.insertRight(0);
rightNode.insertRight(7).insertRight(8);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'three leaves total';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(5);
rightNode = treeRoot.insertRight(9);
rightNode.insertLeft(8);
rightNode.insertRight(5);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'both subtrees superbalanced';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(5);
rightNode = treeRoot.insertRight(9);
rightNode.insertLeft(8).insertLeft(7);
rightNode.insertRight(5);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'both subtrees superbalanced two';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(2);
leftNode.insertLeft(3);
leftNode.insertRight(7).insertRight(8);
treeRoot.insertRight(4).insertRight(5).insertRight(6).insertRight(9);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'three leaves at different levels';
treeRoot = new BinaryTreeNode(1);
leftNode = treeRoot.insertLeft(2);
leftLeft = leftNode.insertLeft(3);
leftNode.insertRight(4);
leftLeft.insertLeft(5);
leftLeft.insertRight(6);
treeRoot.insertRight(7).insertRight(8).insertRight(9).insertRight(10);
assertEquals(isBalanced(treeRoot), false, desc);

desc = 'only one node';
treeRoot = new BinaryTreeNode(1);
assertEquals(isBalanced(treeRoot), true, desc);

desc = 'linked list tree';
treeRoot = new BinaryTreeNode(1);
treeRoot.insertRight(2).insertRight(3).insertRight(4);
assertEquals(isBalanced(treeRoot), true, desc);

function assertEquals(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`)
  }
}