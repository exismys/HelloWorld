class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
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

/**
 * Inserts data at the beginning of the list
 * Time complexity: O(1)
 */
LinkedList.prototype.insertFront = function(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    return this.head;
}

/**
 * Inserts data at the end of the list
 * Time Complexity: O(n)
 */
LinkedList.prototype.insertEnd = function(data) {
    let newNode = new Node(data);
    let current = this.head;
    if (!current) {
        this.head = newNode;
        return;
    }
    while (current.next != null) {
        current = current.next;
    }
    current.next = newNode;
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
        this.head = new Node(data);
        return;
    }
    if (index == 0) {
        this.head = new Node(data, this.head);
        return;
    }
    let node = this.getNodeAt(index - 1);
    let newNode = new Node(data, node.next);
    node.next = newNode;
}

/**
 * Deletes a node at the beginning
 * Time Complexity: O(1)
 */
LinkedList.prototype.deleteFront = function() {
    if (!this.head) {
        return;
    }
    this.head = this.head.next;
}

/**
 * Deletes a node at the end
 * Time Complexity: O(n)
 */
LinkedList.prototype.deleteEnd = function() {
    if (!this.head) {
        return;
    }
    if (!this.head.next) {
        this.head = null;
        return;
    }
    let previous = this.head;
    let tail = this.head.next;
    while (tail.next) {
        previous = tail;
        tail = tail.next;
    }
    previous.next = null;
}

/**
 * Deletes a node at a given position
 * Time Complexity: O(n)
 */
LinkedList.prototype.deleteNodeAt = function(index) {
    if (!this.head) {
        return null;
    }
    if (index == 0) {
        this.head = this.head.next;
        return;
    }
    let node = this.getNodeAt(index - 1);
    if (!node || !node.next) {
        return;
    }
    node.next = node.next.next;
}

/**
 * Deletes the list itself
 * Time Complexity: O(1)
 */
LinkedList.prototype.deleteAll = function() {
    this.head = null;
}

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
}

main();*/