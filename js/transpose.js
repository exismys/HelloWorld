const transpose = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix[i].length; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    return matrix;
}

let matrix = [
    [1, 4, 5],
    [2, 3, 6],
    [7, 8, 9]
];

console.log(transpose(matrix));

// Transpose: Making ith row as ith coloumn and vice-versa