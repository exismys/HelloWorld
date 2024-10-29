let insertionSort = function(array) {
    for (let i = 1; i < array.length; i++) {
        let currentKey = array[i];
        let rightPosition = i;
        let sortedArrayIterator = i - 1;
        while (sortedArrayIterator >= 0 && currentKey < array[sortedArrayIterator]) {
            array[rightPosition] = array[sortedArrayIterator];
            rightPosition--;
            sortedArrayIterator--;
        }
        array[rightPosition] = currentKey;
    }
}

let array = [10, 4, 78, 5, 23, 45, 21, 80, 54, 69, 42];
insertionSort(array);
console.log(array);