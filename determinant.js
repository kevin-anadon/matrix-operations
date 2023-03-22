const formatMatrix = require("./formatMatrix");
const nodeCache = require('node-cache');
const cache = new nodeCache( {stdTTL: 60, maxKeys: 100} )

// returns a scalar

const deleteColumnElem = (col, matrix = []) => {
    matrix.forEach((row) => {
        row.splice(col, 1)
    })
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

module.exports = determinant;

