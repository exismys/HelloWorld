/**
 * Binary Search: Searches for an element in an sorted array
 * Time Complexity: O(log(n))
 * @returns index of the element if found, -1 if not found
 */
let binarySearch = function (array, element) {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (array[mid] == element) {
      return mid;
    } else if (array[mid] > element) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

let array = [10, 20, 50, 60, 65, 70, 80, 90];
console.log(binarySearch(array, 20)); // 1
console.log(binarySearch(array, 70)); // 5
console.log(binarySearch(array, 66)); // -1, not found
