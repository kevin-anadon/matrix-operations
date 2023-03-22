# matx-js
`matx-js` is an npm package that provides matrix operations for any dimension matrix. It provides methods to calculate the determinant using the adjoint and inverse, as well as a method to format a matrix as a string.

## Installation
To use `matx-js`, install it via npm:

```
npm install matx-js
```

## Usage
To use matx-js, import it in your code:

```
const matrixOps = require('matx-js');
```

### determinant(matrix)
Calculates the determinant of a matrix using cofactor expansion.

#### Parameters
`matrix` (Array): An array representing the matrix.
#### Returns
(Number): The determinant of the matrix.
#### Example

```
const matrix = [[1, 2], [3, 4]];
const determinant = matrixOps.determinant(matrix);
console.log(determinant); // Output: -2
```

### adjoint(matrix)
Calculates the adjoint of a matrix.

#### Parameters
`matrix` (Array): An array representing the matrix.
#### Returns
(Array): An array representing the adjoint of the matrix.
#### Example

```
const matrix = [[1, 2], [3, 4]];
const adjoint = matrixOps.adjoint(matrix);
console.log(adjoint); // Output: [[4, -2], [-3, 3]]
```

### inverse(matrix)
Calculates the inverse of a matrix using the adjoint.
(Using '@mathematics/fraction' for fractions).

#### Parameters
`matrix` (Array): An array representing the matrix.
#### Returns
(Array): An array representing the inverse of the matrix.
#### Example

```
const matrix = [[1, 2], [3, 4]];
const inverse = matrixOps.inverse(matrix);
console.log(inverse); // Output: [[-2, 1], [3/2, -3/2]]
```
### formatMatrix(matrix)
Formats a matrix as a string.

#### Parameters
`matrix` (Array): An array representing the matrix.
#### Returns
(String): A string representing the matrix.
#### Example

```
const matrix = [[1, 2], [3, 4]];
const formattedMatrix = matrixOps.formatMatrix(matrix);
console.log(formattedMatrix);
// Output:
// |1  2|
// |3  4|
```

## File Structure
The `matx-js` package consists of the following files:

`adjoint.js`: Contains the code to calculate the adjoint of a matrix.
`determinant.js`: Contains the code to calculate the determinant of a matrix using the adjoint.
`formatMatrix.js`: Contains the code to format a matrix as a string.
`inverse.js`: Contains the code to calculate the inverse of a matrix using the adjoint.
`index.js`: The main file that exports the matrix operations functions.

## Conclusion
`matx-js` provides a simple way to perform matrix operations using JavaScript. It supports matrices of any dimension and includes methods to calculate the determinant using the adjoint and inverse, as well as a method to format a matrix as a string.
