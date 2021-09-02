module.exports = function solveSudoku(matrix) {
    const size = 9;
    const boxSize = 3;

    const findEmpty = (board) => {
        for (let r = 0; r < size; r++) {
            const column = board[r].indexOf(0);
            if (column !== -1) {
                return [r, column];
            }
        }

        return null;
    }

    const isValid = (num, pos, board) => {
        const [r, c] = pos;

        // Check row
        if (board[r].includes(num)) {
            return false;
        }

        // Check column
        for (let index = 0; index < size; index++) {
            if (board[index][c] === num) {
                return false;
            }
        }

        // Check square
        const boxRow = Math.floor(r / boxSize) * boxSize;
        const boxCol = Math.floor(c / boxSize) * boxSize;

        for (let ir = boxRow; ir < boxRow + boxSize; ir++) {
            const row = board[ir].slice(boxCol, boxCol + boxSize);
            if (row.includes(num)) {
                return false;
            }
        }

        return true;
    }

    const solve = () => {
        const currentPos = findEmpty(matrix);

        if (currentPos === null) {
            return true;
        }

        for (let num = 1; num <= size; num++) {
            if (isValid(num, currentPos, matrix)) {
                const [x, y] = currentPos;
                matrix[x][y] = num;

                if (solve()) {
                    return true;
                }

                matrix[x][y] = 0;
            }
        }

        return false;
    }

    solve();

    return matrix;
}
