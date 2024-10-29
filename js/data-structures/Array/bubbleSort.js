/**
 * Sorting Algorithm: Bubble Sort
 * Time Complexity: O(n^2)
 */
let bubbleSort = function (array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
};

let array = [1, 6, 4, 5, 9, 3, 10, 16, 12, 11];
bubbleSort(array);
console.log(array);
