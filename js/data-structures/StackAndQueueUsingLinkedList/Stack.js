const LinkedList = require( "../LinkedList/DoublyLinkedList");

class Stack {
    constructor() {
        this.list = new LinkedList();
    }
}

/**
 * Prints the stack
 * Time Complexity: O(n)
 */
Stack.prototype.printStack = function() {
    this.list.printList();
}

/**
 * Returns Top
 * Time Complexity: O(1);
 */
Stack.prototype.top = function() {
    return this.list.tail.data;
}

/**
 * Push
 * Time Complexity: O(1)
 */
Stack.prototype.push = function(data) {
    this.list.insertEnd(data);
}

/**
 * Pop
 * Time Complexity: O(1)
 */
Stack.prototype.pop = function(data) {
    return this.list.deleteEnd();
}

/**
 * Clear
 * Time Complexity: O(1)
 */
Stack.prototype.clear = function() {
    this.list.deleteAll();
}

// Test
function main() {
    let stack = new Stack();
    // Push
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    // Get top
    console.log(stack.top());
    // Pop
    console.log(stack.pop());
    stack.printStack();
}

main();