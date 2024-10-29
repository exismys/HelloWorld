let merge = function(array, start, mid, end) {
    let leftArray = [], rightArray = [];
    for (let i = start, j = 0; i <= mid; i++) leftArray[j++] = array[i];
    for (let i = mid + 1, j = 0; i <= end; i++) rightArray[j++] = array[i];
    let i = 0, j = 0, current = start;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] < rightArray[j]) array[current++] = leftArray[i++];
        else array[current++] = rightArray[j++];
    }
    while (i < leftArray.length) {
        array[current++] = leftArray[i++];
    }
    while (j < rightArray.length) {
        array[current++] = rightArray[j++];
    }
}

let mergeSort = function(array, start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        mergeSort(array, start, mid);
        mergeSort(array, mid + 1, end);
        merge(array, start, mid, end);
    }
}

let array = [10, 40, 20, 15, 60, 1, 23, 11, 94, 21, 12];
mergeSort(array, 0, array.length - 1);
console.log(array);