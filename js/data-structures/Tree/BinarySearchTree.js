class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/**
 * BST: Binary Search Tree
 * Left child must be smaller and right side, larger
 */
class BST {
    constructor() {
        this.root = null;
    }
}

/**
 * Searches an item in the tree
 * @returns an object: {found: Boolean, parent: Node}
 * Time Complexity: O(n)
 */
BST.prototype.search = function(data) {
    let current = this.root;
    let result = {found: false, parent: null, node: null};
    while (current) {
        if (data == current.data) {
            result.found = true;
            result.node = current;
            break;
        } else if (data < current.data) {
            result.parent = current;
            current = current.left;
        } else {
            result.parent = current;
            current = current.right;
        }
    }
    return result;
}

/**
 * Inserts an item into the tree
 * Time Complexity: O(n)
 */
BST.prototype.insert = function(data) {
    let result = this.search(data);
    if (result.found) return;
    else if (!result.parent) this.root = new Node(data);
    else if (data < result.parent.data) result.parent.left = new Node(data);
    else result.parent.right = new Node(data);
}

/**
 * Pre-order traversal
 * Time Complexity: O(n)
 */
BST.prototype.preOrder = function(root = this.root) {
    if (root) {
        console.log(root.data);
        this.preOrder(root.left);
        this.preOrder(root.right);
    }
}

/**
 * In-order traversal
 * Time Complexity: O(n)
 */
BST.prototype.inOrder = function(root = this.root) {
    if (root) {
        this.inOrder(root.left);
        console.log(root.data);
        this.inOrder(root.right);
    }
}

/**
 * Post-order traversal
 * Time Complexity: O(n)
 */
BST.prototype.postOrder = function(root = this.root) {
    if (root) {
        this.postOrder(root.left);
        this.postOrder(root.right);
        console.log(root.data);
    }
}

/**
 * @returns a node with minimum data
 * Time complexity: O(n)
 */
BST.prototype.minimum = function(root = this.root) {
    if (!root) return;
    while (root.left) {
        root = root.left;
    }
    return root;
}

/** 
 * @returns a node with the maximum data
 * Time complexity: O(n)
 */
BST.prototype.maximum = function(root = this.root) {
    if (!root) return;
    while (root.right) {
        root = root.right;
    }
    return root;
}

/**
 * Deletes a node from the tree
 * Time Complexity: O(n)
 */
BST.prototype.delete = function(data) {
    let result = this.search(data);
    if (!result.found) return;
    let side = result.parent.right == result.node ? "right" : "left";
    if (!result.node.left && !result.node.right) result.parent[side] = null;
    else if (!result.node.left) result.parent[side] = result.node.right;
    else if (!result.node.right) result.parent[side] = result.node.left;
    else {
        let successor = this.minimum(result.node.right);
        successor.left = result.node.left;
        successor.right = result.node.right;
        this.delete(successor.data);
        result.parent[side] = successor;
    }
}

// Test
/*function main() {
    let bst = new BST();
    bst.insert(10);
    bst.insert(9);
    bst.insert(20);
    bst.insert(31);
    bst.insert(25);
    bst.insert(1);
    bst.inOrder();
    console.log('minimum: ' + bst.minimum().data);
    console.log('maximum: ' + bst.maximum().data);
    bst.delete(20);
    bst.delete(1);
    bst.delete(31);
    bst.inOrder();
}

main();*/