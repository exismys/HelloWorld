class MinHeap {
  constructor() {
    this.underlyingArray = [];
    this.size = 0;
  }

  leftChild(i) {
    return 2 * i + 1;
  }

  rightChild(i) {
    return 2 * i + 2;
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
}

/**
 * Swaps two values in the underlying array
 * Time Complexity: O(1)
 */
MinHeap.prototype.swap = function (index1, index2) {
  let temp = this.underlyingArray[index1];
  this.underlyingArray[index1] = this.underlyingArray[index2];
  this.underlyingArray[index2] = temp;
};

/**
 * Inserts data into the heap
 * Time Complexity: O(log(n))
 */
MinHeap.prototype.insert = function (data) {
  this.underlyingArray[this.size] = data;
  this.size++;
  for (
    let i = this.size - 1;
    i != 0 && this.underlyingArray[this.parent(i)] > this.underlyingArray[i];
    i = this.parent(i)
  ) {
    this.swap(i, this.parent(i));
  }
};

/**
 * Heapify: Reshapes binary tree into the min heap
 * Time Complexity: O(h), O(log(n))
 */
MinHeap.prototype.heapify = function (index) {
  let leftChild = this.leftChild(index);
  let rightChild = this.rightChild(index);
  let rootValue = this.underlyingArray[index];
  let leftValue = this.underlyingArray[leftChild];
  let rightValue = this.underlyingArray[rightChild];

  // if root is smallest
  let smallest = index;

  // If left child is the smallest
  if (leftChild < this.size && leftValue < rootValue) {
    smallest = leftChild;
  }

  // if right child is the smallest
  if (rightChild < this.size && rightValue < this.underlyingArray[smallest]) {
    smallest = rightChild;
  }

  if (smallest != index) {
    this.swap(smallest, index);
    this.heapify(smallest);
  }
};

/**
 * @returns and remove minimum of heap
 * Time Complexity: O(h), O(log(n))
 */
MinHeap.prototype.extractMin = function () {
  if (this.size <= 0) {
    return Infinity;
  }
  if (this.size == 1) {
    this.size--;
    return this.underlyingArray[this.size];
  }
  this.swap(0, this.size - 1);
  this.size--;
  this.heapify(0);
  return this.underlyingArray[this.size];
};

/**
 * Decreases the value at a given index to a given parameter
 * Time Complexity: O(log(n))
 */
MinHeap.prototype.decreaseKey = function (index, data) {
  this.underlyingArray[index] = data;
  while (
    index != 0 &&
    this.underlyingArray[this.parent(index)] > this.underlyingArray[index]
  ) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
  }
};

/**
 * Deletes a value at given index
 * Time Complexity: O(log(n))
 */
MinHeap.prototype.deleteKey = function (index) {
  this.decreaseKey(index, -Infinity);
  this.extractMin();
};

/**
 * Build Heap: Builds a heap from a given array
 * Time Complexity: O(n)
 */
MinHeap.prototype.buildHeap = function (array) {
  this.underlyingArray = array;
  this.size = array.length;
  for (let i = this.parent(this.size - 1); i >= 0; i--) {
    this.heapify(i);
  }
};

function main() {
  let heap = new MinHeap();
  heap.insert(5);
  heap.insert(6);
  heap.insert(3);
  console.log(heap.underlyingArray); // [3, 6, 5]
  console.log(heap.underlyingArray.toString()); // 3,6,5; joined each element with ','
  console.log(heap.extractMin()); // 3
  console.log(heap.underlyingArray, heap.size); // [5, 6, 3]; valid till index 1
  heap.deleteKey(1);
  console.log(heap.underlyingArray, heap.size); // [5, -Infinity, 3]; valid till index 0
  heap.buildHeap([1, 5, 2, 19, 3, 7, 6, 4]); // test failing
  console.log(heap.underlyingArray, heap.size);
}

main();
