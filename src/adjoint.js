// return a new matrix
// i = row, j = column
// Cij = (-1)^(i + j) * det(Mij) then Transpose
const nodeCache = require('node-cache');
const determinant = require("./determinant");
const cache = new nodeCache( {stdTTL: 60, maxKeys: 100} )

const deleteRowElem = (i, matrix = []) => {
    matrix.splice(i, 1)
}

const deleteColumnElem = (j, matrix = []) => {
    matrix.forEach((row) => {
        row.splice(j, 1)
    })
}

const getMinor = (matrix = [], i, j) => {
    const minorMatrix = JSON.parse(JSON.stringify(matrix))
    deleteRowElem(i, minorMatrix)
    deleteColumnElem(j, minorMatrix)
    return minorMatrix
}

const adjGreaterThan3 = (matrix = []) => { 
    let adjoint = JSON.parse(JSON.stringify(matrix));
    matrix.forEach((row, i) => {
        row.forEach((col, j) => {
            const firstOperator = Math.pow(-1, ((i + 1) + (j + 1))) 
            const minor = getMinor(matrix, i, j)
            const cofactor = firstOperator * determinant(minor) //Cij = an element of the adjoint
            // Transpose the matrix, aij --> aji
            adjoint[j][i] = cofactor 
        });
    });
    return adjoint
}

const twoSizeMatrixesCalc = (matrix) => { 
    const adjoint = JSON.parse(JSON.stringify(matrix))
    adjoint[0][0] = matrix[1][1];
    adjoint[0][1] = -1 * matrix[0][1]
    adjoint[1][0] = -1 * matrix[1][0]
    adjoint[1][1] = matrix[1][0]
    return adjoint
}

const adjoint = (matrix) => {
    if (!matrix || matrix.length === 0) throw new Error('The matrix can not be empty')
    // Check if the result is already in the cache
    const cacheKey = JSON.stringify(matrix)
    const cachedResult = cache.get(cacheKey)
    if (cachedResult !== undefined) return cachedResult

    const adj = (matrix.length === 2) 
        ? twoSizeMatrixesCalc(matrix) 
        : adjGreaterThan3(matrix)
    // Store the result in the cache for future use
    cache.set(cacheKey, adj)
    return adj
}

module.exports = adjoint;
