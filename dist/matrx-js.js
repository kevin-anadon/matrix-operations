import Fraction from 'fraction.js';
import nodeCache from 'node_cache.min.js';
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

const twoSizeMatrixesAdj = (matrix) => { 
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
        ? twoSizeMatrixesAdj(matrix) 
        : adjGreaterThan3(matrix)
    // Store the result in the cache for future use
    cache.set(cacheKey, adj)
    return adj
}

const detGreaterThan3 = (matrix = []) => {
    let det = 0
    for (let i = 0; i < matrix[0].length; i++) {
        let elemFirstRow = matrix[0][i]
        const sizeTwoMatrix = structuredClone(matrix) || JSON.parse(JSON.stringify(matrix)) // clone matrix
        sizeTwoMatrix.shift()
        deleteColumnElem(i, sizeTwoMatrix)
        if ((i + 1) % 2 == 0 ) { elemFirstRow = -elemFirstRow } // if is even it`s the opposite
        det += elemFirstRow * determinant(sizeTwoMatrix)
    }
    return det
}

const twoSizeMatrixesCalc = (matrix) => { 
    return ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]))    
}

const determinant = (matrix) => {
    if (!matrix || matrix.length === 0) throw new Error('The matrix can not be empty')
    // Check if the result is already in the cache
    const cacheKey = JSON.stringify(matrix)
    const cachedResult = cache.get(cacheKey)
    if (cachedResult !== undefined) return cachedResult

    const det = (matrix.length === 2) 
        ? twoSizeMatrixesCalc(matrix) 
        : detGreaterThan3(matrix)

    // Store the result in the cache for future use
    cache.set(cacheKey, det)
    return det
}

const calcInverse = (matrix = []) => { 
    // 1/det * Adj
    const det = determinant(matrix)
    const adj = adjoint(matrix)
    let inv = JSON.parse(JSON.stringify(matrix))
    adj.forEach((row, i) => {
        for (let j = 0; j < adj.length; j++) {
            const OPERATION = new Fraction(adj[i][j], det) || ((1/det) * adj[i][j]) // if npm packg is down
            inv[i][j] = OPERATION.toString()
        }
    })
    return inv
}

const inverse = (matrix) => {
    if (!matrix || matrix.length === 0) throw new Error('The matrix can not be empty')
    // matrix not invertible
    if (determinant(matrix) === 0) return []

    // Check if the result is already in the cache
    const cacheKey = JSON.stringify(matrix)
    const cachedResult = cache.get(cacheKey)
    if (cachedResult !== undefined) return cachedResult
    const inv = calcInverse(matrix)
    // Store the result in the cache for future use
    cache.set(cacheKey, inv)
    return inv
}

const formatMatrix = (matrix = []) => { 
    // Works for NxN matrixes

    let matrixString = '|'
    let prevRow = matrix[0]
    matrix.forEach(row => {
        if (prevRow !== row) {
            prevRow = row
            matrixString += '|'
            matrixString += '\r\n|'
        }
        row.forEach((elem, index) => {
            (index === row.length - 1) 
                ? matrixString += `${elem}` 
                : matrixString += `${elem} `
        })
    })
    matrixString += '|'
    return matrixString
}

export default {
    matrxJS: {
        adjoint,
        determinant,
        inverse,
        formatMatrix
    }
};
