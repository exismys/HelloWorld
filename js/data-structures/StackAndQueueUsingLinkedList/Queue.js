const LinkedList = require( "../LinkedList/DoublyLinkedList");

class Queue {
    constructor() {
        this.list = new LinkedList();
    }
}

/**
 * Prints the queue
 * Time Complexity: O(n)
 */
Queue.prototype.printQueue = function() {
    this.list.printList();
}

/**
 * Returns the front
 * Time Complexity: O(1)
 */
Queue.prototype.front = function() {
    return this.list.head.data;
}

/**
 * Returns the end
 * Time Complexity: O(1)
 */
Queue.prototype.end = function() {
    return this.list.tail.data;
}

/**
 * Enqueue
 * Time Complexity: O(1)
 */
Queue.prototype.enqueue = function(data) {
    this.list.insertEnd(data);
}

/**
 * Dequeue
 * Time Complexity: O(1)
 */
Queue.prototype.dequeue = function() {
    return this.list.deleteFront();
}

/**
 * Clear
 * Time Complexity: O(1)
 */
Queue.prototype.clear = function() {
    this.list.deleteAll();
}

// Test
function main() {
    let queue = new Queue();
    // Enqueue
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    // Dequeue
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.dequeue())
    queue.printQueue();
}

main();