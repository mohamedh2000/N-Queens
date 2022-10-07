// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



function generateNewBoard(dimensions) {
  let board = [];
  
  for(let i = 0; i < dimensions; i++) {
    board.push(
      new Array(dimensions).fill(-1)
    );
  }
  return board;
}


function nQueenSolutions(dimensions) {
  if(dimensions == 1) {
    return [["Q"]];
  }
  let solutions = [];

  for(let i = 0; i < dimensions; i++) {
    for(let j = 0; j < dimensions; j++) {
      let tempBoard = generateNewBoard(dimensions);
      tempBoard[i][j] = 1;
      let illegalMovesBank = new Map();
      addNewIllegalMovements(illegalMovesBank, i, j, tempBoard.length);
      let tempSolution = getSolutions(tempBoard, dimensions, illegalMovesBank);
      if(tempSolution.length > 0) solutions.push(tempSolution);
    }
  }

  return solutions;

}

function illegalBMovement(illegalMovesBank, b) {
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

function getSolutions(board, queensLeft, illegalMovesBank) {
  for(let n = 0; n < board.length; n++) {
    let currentRow = board[n];
      for(let b = 0; b < board[n].length; b++) {
        let currIllegalBank = illegalMovesBank.get(n) ?? [];
        if(currIllegalBank.indexOf(b) == -1 && !illegalBMovement(illegalMovesBank, b)) { 
          //if this is true getSolutions of the same board with a copy of illegalMovesBank where we take this option and another 
          //getSolutions without this option -- don't decrement queensLeft for the latter -- and concat their solutions at the end 

          // will need to make this dynamic dispatch where I can save past results if the illegalMovesBanks branch off that way they 
          // dont need to go through the same solutions 
          currentRow[b] = 1;
          queensLeft --;
          addNewIllegalMovements(n,b, board.length);
        }
        board[n] = currentRow;
      } 
  }
  if(queensLeft == 0) { 
    return board;
  }
  return [];
}

function addNewIllegalMovements(illegalMovesBank, row, column, dimensions) {
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
console.log("SOLUTION: ", nQueenSolutions(4));

// Q if queen spot 
// . if not queen spot

// 1 for 1
// 0 for 2 
// 0 for 3
// 2 solutions for 4
// 10 solutions for 5