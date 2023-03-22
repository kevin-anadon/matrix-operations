// return a matrix that represents the inverse
const Fraction = require('@mathematics/fraction');
const nodeCache = require('node-cache');

const adjoint = require("./adjoint");
const determinant = require("./determinant");
const cache = new nodeCache( {stdTTL: 60, maxKeys: 100} )

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

module.exports = inverse;
