const puzzles = {
    easy: [
        [
            [null, null, null, null, null, null, null, null, 8], // Box 1, Cells 1-9
            [null, 2, 8, 3, null, null, null, null, 1],
            [null, 7, null, null, null, 8, null, null, 4], 
            [null, 4, null, null, 8, null, 5, null, 7],
            [null, null, null, 7, 5, 6, null, null, null],
            [7, null, 6, null, 4, null, null, 1, null],
            [9, null, null, 8, null, null, null, 2, null],
            [8, null, null, null, null, 9, 5, 4, null],
            [6, null, null, null, null, null, null, null, null]
        ]
    ]
}

/**
 * Handle key input
 * @param {*} e 
 */
function handleKeyPress(e) {

    const focused = getFocused();
    if (focused) {

        const keyCode = e.keyCode;
        
        // Handle backspace
        if (keyCode === 8) {

            focused.textContent = '';
            return;
        }

        // Between 1 and 9
        if ((keyCode > 48 && keyCode <= 57) || (keyCode > 96 && keyCode <= 105)) { 

            const key = e.key;
            focused.textContent = key;

            console.log(evaluateGame());
        }
    }
}

/**
 * Handle a cell click.
 * @param {*} e 
 */
function handleCellClick(e) {

    setFocus(e.target);
}

/**
 * Focus on the specified cell. 
 * Unfocus the previous cell as well.
 * @param {*} cell 
 */
function setFocus(cell) {

    const focused = getFocused();
    if (focused) {

        focused.classList.remove('focused');
    }

    cell.classList.add('focused');
}

/**
 *  Get the currently focused cell.
 */
function getFocused() {

    return document.querySelector('.game .focused');
}

/**
 * Evaluates the current state of the game board.
 * Returns true if valid, otherwise false.
 */
function evaluateGame() {

    const maxVal = 45; // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9
    const data = getGameData();

    for (var b = 0; b < data.length; r++) {

        let rowTotal = 0;
        let colTotal = 0;
        let boxTotal = 0;

        for (var c = 0; c < 9; c++) {
            
            const rowData = data[b][c];
            const colData = data[c][b];
            const boxData = data[Math.floor(c / 3)][c % 3];

            if (!rowData || !colData || !boxData) {

                return false;
            }

            rowTotal += data[b][c];
            colTotal += data[c][b];
            boxTotal += data[Math.floor(c / 3)][c % 3];

            if (rowTotal > maxVal || colTotal > maxVal || boxTotal > maxVal) {
                
                return false;
            }
        }
    }

    return true;
}

/**
 * Returns the current state of the game board.
 */
function getGameData() {

    const data = [];
    const game = document.querySelector('.game');
    for(let b = 0; b < game.children.length; ++b) {

        let boxData = [];
        let box = game.children[b];
        for(let c = 0; c < box.children.length; ++c) {

            let cell = box.children[c];
            boxData.push(cell.textContent.length ? parseInt(cell.textContent) : null);
        }

        data.push(boxData);
    }

    return data;
}

/**
 * Accepts box 0-? and cell 0-?
 * 
 * @param {*} box 
 * @param {*} cell 
 */
function getCell(box, cell) {

    return document.querySelector(`.game .box:nth-child(${box + 1}) .cell:nth-child(${cell + 1})`);
}

/**
 * Create the game board and inject it into the page.
 */
function createGame(puzzleData) {

    // Generate game div
    const game = document.createElement('div');
    game.classList.add('game');

    for (let b = 0; b < puzzleData.length; ++b) {

        const boxData = puzzleData[b];
        const box = document.createElement('div');
        box.classList.add('box');

        for (let c = 0; c < boxData.length; ++c) {

            const cellData = boxData[c];
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (cellData) {

                cell.classList.add('readonly');
                cell.textContent = cellData;
            }
            else {

                cell.addEventListener('click', (e) => handleCellClick(e));
            }

            box.appendChild(cell);
        }

        game.appendChild(box);
    }

    // Append to the DOM
    document.body.appendChild(game);

    // Set initial focus
    setFocus(getCell(0,0));
}

document.addEventListener('DOMContentLoaded', () => {
 
    window.addEventListener('keyup', (e) => handleKeyPress(e));

    createGame(puzzles.easy[0]);
    console.log(JSON.stringify(getGameData()));
});