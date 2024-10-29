let MaxHeap = require("./MaxHeap");

/**
 * Heap Sort: @returns sorted array
 * Time Complexity: O(n * log(n))
 */
let heapSort = function (array) {
  let heap = new MaxHeap();
  heap.buildHeap(array);
  while (heap.size > 1) {
    heap.swap(0, heap.size - 1);
    heap.size -= 1;
    heap.heapify(0);
  }
  return heap.underlyingArray;
};

function main() {
  let sorted = heapSort([10, 69, 21, 25, 36, 1, 32, 68, 11]);
  console.log(sorted); // Sorted!
}

main();
