class Node {
    constructor(data, previous = null, next = null) {
        this.data = data;
        this.previous = previous;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
}

/**
 * Traverses a linked list
 * Time complexity: O(n)
 */
 LinkedList.prototype.printList = function() {
    if (!this.head) {
        console.log("Empty List!");
    }
    let current = this.head;
    while (current) {
        console.log(current.data);
        current = current.next;
    }
}
// Inverse
LinkedList.prototype.printListInverse = function() {
    console.log("---");
    if (!this.head) {
        console.log("Empty List!");
    }
    let current = this.tail;
    while (current) {
        console.log(current.data);
        current = current.previous;
    }
}

/**
 * Inserts data at the beginning of the list
 * Time complexity: O(1)
 */
 LinkedList.prototype.insertFront = function(data) {
    if (!this.head) {
        this.head = this.tail = new Node(data);
        return;
    }
    let newNode = new Node(data, null, this.head);
    this.head.previous = newNode;
    this.head = newNode;
}

/**
 * Inserts data at the end of the list
 * Time Complexity: O(1)
 */
 LinkedList.prototype.insertEnd = function(data) {
    if (!this.head) {
        this.head = this.tail = new Node(data);
        return;
    }
    let newNode = new Node(data, this.tail);
    this.tail.next = newNode;
    this.tail = newNode;
}

/**
 * Returns a node at a given position
 * Time Complexity: O(n)
 */
 LinkedList.prototype.getNodeAt = function(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
        if (counter == index) {
            return node;
        }
        counter++;
        node = node.next;
    }
    return null;
}

/**
 * Inserts data at a given position
 * Time Complexity: O(n)
 */
 LinkedList.prototype.insertAt = function(data, index) {
    if (!this.head) {
        this.head = this.tail = new Node(data);
        return;
    }
    if (index == 0) {
        let newNode = new Node(data, null, this.head);
        this.head.previous = newNode;
        this.head = newNode;
        return;
    }
    let node = this.getNodeAt(index - 1);
    let newNode = new Node(data, node, node.next);
    node.next.previous = newNode;
    node.next = newNode;
}

/**
 * Deletes a node at the beginning
 * Time Complexity: O(1)
 */
 LinkedList.prototype.deleteFront = function() {
    if (!this.head) {
        return null;
    }
    if (!this.head.next) {
        let deleted = this.head.data;
        this.head = this.tail = null;
        return deleted;
    }
    let deleted = this.head.data;
    this.head = this.head.next;
    this.head.previous = null;
    return deleted;
}

/**
 * Deletes a node at the end
 * Time Complexity: O(1)
 */
 LinkedList.prototype.deleteEnd = function() {
    if (!this.head) {
        return null;
    }
    if (!this.head.next) {
        let deleted = this.head.data;
        this.head = this.tail = null;
        return deleted;
    }
    let deleted = this.tail.data;
    this.tail.previous.next = null;
    this.tail = this.tail.previous;
    return deleted;
}

/**
 * Deletes a node at a given position
 * Time Complexity: O(n)
 */
 LinkedList.prototype.deleteNodeAt = function(index) {
    if (!this.head) {
        return null;
    }
    if (!this.head.next && index == 0) {
        this.head = this.tail = null;
    }
    if (index == 0) {
        this.head = this.head.next;
        this.head.previous = null;
        return;
    }
    let node = this.getNodeAt(index - 1);
    if (!node || !node.next) {
        return;
    }
    node.next = node.next.next;
    node.next.previous = node;
}

/**
 * Deletes the list itself
 * Time Complexity: O(1)
 */
 LinkedList.prototype.deleteAll = function() {
    this.head = this.tail = null;
}

module.exports = LinkedList;

/*function main() {
    let list = new LinkedList();
    // Inserting at beginning
    list.insertFront(30);
    list.insertFront(20);
    // Inserting at End
    list.insertEnd(40);
    list.insertEnd(50);
    // Inserting at a specific index
    list.insertAt(2, 0);
    list.insertAt(4, 1);
    // Deleting at front
    list.deleteFront();
    // Deleting at end
    list.deleteEnd();
    // Deleting node at a specific index
    list.deleteNodeAt(0)
    list.deleteNodeAt(1)
    // Deleting all
    list.deleteAll();
    list.printList();
    list.printListInverse();
}

main();*/