class MaxHeap {
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
MaxHeap.prototype.swap = function (index1, index2) {
  let temp = this.underlyingArray[index1];
  this.underlyingArray[index1] = this.underlyingArray[index2];
  this.underlyingArray[index2] = temp;
};

/**
 * Heapify: Reshapes binary tree into the max heap
 * Time Complexity: O(h), O(log(n))
 */
MaxHeap.prototype.heapify = function (index) {
  let leftChild = this.leftChild(index);
  let rightChild = this.rightChild(index);
  let rootValue = this.underlyingArray[index];
  let leftValue = this.underlyingArray[leftChild];
  let rightValue = this.underlyingArray[rightChild];

  // if root is smallest
  let largest = index;

  // If left child is the smallest
  if (leftChild < this.size && leftValue > rootValue) {
    largest = leftChild;
  }

  // if right child is the smallest
  if (rightChild < this.size && rightValue > this.underlyingArray[largest]) {
    largest = rightChild;
  }

  if (largest != index) {
    this.swap(largest, index);
    this.heapify(largest);
  }
};

/**
 * Build Heap: Builds a heap from a given array
 * Time Complexity: O(n)
 */
MaxHeap.prototype.buildHeap = function (array) {
  this.underlyingArray = array;
  this.size = array.length;
  for (let i = this.parent(this.size - 1); i >= 0; i--) {
    this.heapify(i);
  }
};

module.exports = MaxHeap;
