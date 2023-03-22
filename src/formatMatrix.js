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

module.exports = formatMatrix;
