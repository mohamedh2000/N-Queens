// generates a new nested board of dim x dim.
// all non queen spots will be filled with -1
function generateNewBoard(dimensions) {
  let board = [];

  for (let i = 0; i < dimensions; i++) {
    board.push(new Array(dimensions).fill(-1));
  }
  return board;
}

function nQueenSolutions(dimensions) {
  if (dimensions == 1) {
    return [["Q"]];
  }
  let solutions = [];

  for (let i = 0; i < dimensions; i++) {
    for (let j = 0; j < dimensions; j++) {
      //construct a new dim x dim board 
      let tempBoard = generateNewBoard(dimensions);
      //set the first queen of this new board to a new spot 
      tempBoard[i][j] = 1;
      //add all of the illegal movements on this board due to this queens placement
      //for future reference when checking to see if a board spot is valid for a new queen
      let illegalMovesBank = addNewIllegalMovements(
        new Map(),
        i,
        j,
        tempBoard.length
      );
      //retrieve all of the possible solutions from this starter placement
      let tempSolution = getSolutions(
        tempBoard,
        dimensions - 1,
        illegalMovesBank,
        i + 1
      );
      //concat all of the solutions from this placement into the main solutions array
      if (tempSolution.length > 0) {
        solutions = [...solutions, ...tempSolution];
      }
    }
  }
  return solutions;
}

/* 
Loops through and tries to find solutions with the current board passed in. 

board: Array of length dimensions where each nested array is of length dimensions
queensLeft: Number of queensLeft to be placed 
illegalMovesBank: Map holding all of the illegal placements for queens 
i: the row to start checking for the next queen placement
*/
function getSolutions(board, queensLeft, illegalMovesBank, i) {
  let solutions = [];
  for (let row = i; row < board.length; row++) {
    let currentRow = board[row];
    for (let col = 0; col < currentRow.length; col++) {
      let currIllegalBank = illegalMovesBank.get(row) ?? [];

      //if this is a valid spot for a new queen, enter conditional
      if (currIllegalBank.indexOf(col) == -1) {

        // make a copy of the current illegal placements and add new illegal placements
        // from adding the new queen to the board 
        let branchedIllegalBank = addNewIllegalMovements(
          illegalMovesBank,
          row,
          col,
          board.length
        );
        //make a new deep nested copy of the current array board
        let copyOfBoard = JSON.parse(JSON.stringify(board));
        copyOfBoard[row][col] = 1;

        //if there are no more queens to place, add this to board to the solutions
        if (queensLeft - 1 == 0) {
          solutions = [...solutions, copyOfBoard];
        } else {
          //if queens are still available, get the possible solutions with this board placement 
          solutions = [
            ...solutions,
            ...getSolutions(
              copyOfBoard,
              queensLeft - 1,
              branchedIllegalBank,
              row + 1
            ),
          ];
        }
      }
    }
  }
  return solutions;
}

/*
This will return a new map with the updated illegal placements from the new queen placement. 

illegalMovesBank: The current map of illegal placements on the board for any new queens 
row: the row of the new queen placement 
column: the column of the new queen placement
dimensions: The dimensions of the board 
*/
function addNewIllegalMovements(illegalMovesBank, row, column, dimensions) {

  //creates a deeply nested copy of the passed in illegalmoves map
  let newMap = new Map(
    JSON.parse(JSON.stringify(Array.from(illegalMovesBank)))
  );

  if (!newMap.has(row)) {
    newMap.set(row, []);
  }

  for (let i = 0; i < dimensions; i++) {
    // this will set the column value of this new queen illegal for all rows in the board
    if (i != row) {
      var tempMoves = newMap.get(i) ?? [];
      tempMoves.push(column);
      newMap.set(i, tempMoves);
    } else {

      // All spots on the newley placed queens row will be illegal going forward 
      let newIllegalRow = [];
      for (let j = 0; j < dimensions; j++) {
        newIllegalRow.push(j);
      }
      newMap.set(row, newIllegalRow);
    }
  }

  // this will deal with adding all of the new illegal diagnol positions 
  function addIllegalDiag(currRow, currCol, left) {
    let tempCol = currCol;
    let tempRow = currRow;

    //while we are in the bounds of the board, add to the map all of the upper left (left) and lower right diagnol(right) illegal placements 
    while (true) {
      if (
        tempCol >= 0 &&
        tempCol < dimensions &&
        tempRow >= 0 &&
        tempRow < dimensions
      ) {
        let currIllegalRow = newMap.get(tempRow);
        if (currIllegalRow.indexOf(tempCol) == -1) {
          currIllegalRow.push(tempCol);
          newMap.set(tempRow, currIllegalRow);
        }
        left ? tempCol-- : tempCol++;
        left ? tempRow-- : tempRow++;
      } else {
        break;
      }
    }


    tempCol = currCol;
    tempRow = currRow;

    //while we are in the bounds of the board, add to the map all of the lower left diagnol spots on the left side of the board 
    // and all of the upper right diagnol placements on the board (right)
    while (true) {
      if (
        tempCol >= 0 &&
        tempCol < dimensions &&
        tempRow >= 0 &&
        tempRow < dimensions
      ) {
        let currIllegalRow = newMap.get(tempRow);
        if (currIllegalRow.indexOf(tempCol) == -1) {
          currIllegalRow.push(tempCol);
          newMap.set(tempRow, currIllegalRow);
        }
        left ? tempCol-- : tempCol++;
        left ? tempRow++ : tempRow--;
      } else {
        break;
      }
    }
  }

  //adds of the illegal diagnol placements from this new queen placement
  addIllegalDiag(row, column, 1);
  addIllegalDiag(row, column, 0);
  return newMap;
}

function testNQueens(n, expected) {
  console.log(`N-QUEENS ${n}: `, nQueenSolutions(n).length == expected ? "PASSED" : "FAILED")
}

testNQueens(1, 1);
testNQueens(2, 0);
testNQueens(3, 0);
testNQueens(4, 2);
testNQueens(5, 10);
testNQueens(6, 4);
testNQueens(7, 40);
testNQueens(8, 92);
testNQueens(9, 352);