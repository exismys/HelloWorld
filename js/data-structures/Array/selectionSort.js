let selectionSort = function(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minValueIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minValueIndex]) {
                minValueIndex = j;
            }
        }
        let temp = array[i];
        array[i] = array[minValueIndex];
        array[minValueIndex] = temp;
    }
}

let array = [1, 6, 4, 5, 9, 3, 10, 16, 12, 11];
selectionSort(array);
console.log(array);