// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

let illegalMovesBank = new Map();


function nQueenSolutions(dimensions) {
  if(dimensions == 1) {
    return [["Q"]];
  }
  let solutions = [];
  let board = [];
  

  for(let i = 0; i < dimensions; i++) {
    board.push(new Array(dimensions).fill(-1));
    for(let j = 0; j < dimensions; j++) {
      let tempBoard = board;
      tempBoard[i][j] = 1;
      let tempSolution = helper(tempBoard, dimensions);
      solutions.push(tempSolution);
      illegalMovesBank.clear();
    }
  }

  return solutions;

}

function illegalBMovement(b) {
  if(illegalMovesBank.size == 0) { 
    return false;
  }
  for(const arr of illegalMovesBank.values()) {
    if(arr.indexOf(b) !== -1) {
      return true;
    }
  }

  return false;
}

function helper(board, queensLeft) {
  console.log(board);
  for(let n = 0; n < board.length; n++) {
    let currentRow = board[n];
      for(let b = 0; b < board[n].length; b++) {
        let currIllegalBank = illegalMovesBank.get(n) ?? [];
        if(currIllegalBank.indexOf(b) == -1 && !illegalBMovement(b)) { 
          currentRow[b] = 1;
          queensLeft --;
          addNewIllegalMovements(n,b, board.length);
        }
      } 
  }
  if(queensLeft == 0) { 
    return board;
  }
}

function addNewIllegalMovements(row, column, dimensions) {
  if(!illegalMovesBank.has(row)) {
    illegalMovesBank.set(row, []);
  }

  for(let i = 0; i < dimensions; i++) {
    if(i != row) {
      var tempMoves = illegalMovesBank.get(i) ?? [];
      tempMoves.push(column);
      illegalMovesBank.set(i, tempMoves);
    }
    else {
      let oldRow = illegalMovesBank.get(row);
      oldRow.push(i);
      illegalMovesBank.set(row, oldRow);
    }
  }

  function addIllegalDiag(currRow, currCol, leftOrRight) {
    if(currCol >= 0 && currCol < dimensions) {
      if(!illegalMovesBank.has(currRow)) {
        illegalMovesBank.set(currRow, []);
      }
      let currIllegalRow = illegalMovesBank.get(currRow);
      currIllegalRow.push(currCol);
      illegalMovesBank.set(currRow, currIllegalRow);
      if(leftOrRight == 1) {
        addIllegalDiag(currRow + 1, currCol - 1);
        addIllegalDiag(currRow - 1, currCol - 1);
      }
      else {
        addIllegalDiag(currRow + 1, currCol + 1);
        addIllegalDiag(currRow - 1, currCol + 1);
      }
    }
  }
  //right is 0 left is 1
  addIllegalDiag(row, column, 1)
  addIllegalDiag(row, column, 0) 
}

//console.log(nQueenSolutions(1));
nQueenSolutions(2)