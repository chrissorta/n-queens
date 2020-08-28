/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function (n) {
  var board = new Board({ n: n });
  var solution = board.rows();
  //create a count of rooks on the board
  var rooksCount = 0;
  //loop over the top row(solution[0]), place the first rook at i (solution[0][i])
  for (var i = 0; i < n; i++) {
    //  count+=1;
    solution[0][i] = 1;
    rooksCount += 1;
    //  loop over the solution stariting from solution[row], row =1
    for (var row = 1; row < n; row++) {
      //    loop over solution[row][col]
      for (var col = 0; col < n; col++) {
        solution[row][col] = 1;
        if (board.hasAnyRooksConflicts()) {
          solution[row][col] = 0;
        } else {
          rooksCount += 1;
        }
      }

    }
    if (rooksCount === n) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }

  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;
  // create a board of n size;
  var board = new Board({ n: n });

  // helper function with current board, pieceCount, rowCount
  var helper = function (currentBoard, pieceCount, rowCount) {
    //   base case if board has n pieces
    if (pieceCount === n) {
      //     increment solution count
      solutionCount++;
    }
    //   recursive case
    //    nested for loop
    for (var row = rowCount; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //      place piece on board if no conflicts;
        currentBoard.rows()[row][col] = 1;
        if (currentBoard.hasAnyRooksConflicts()) {
          currentBoard.rows()[row][col] = 0;
        } else {
          helper(currentBoard, pieceCount + 1, rowCount + 1);

        }
      }
    }
    //      run helper function on current board, pieceCount +1, rowCount + 1;
  };

  // run the helper function on the empty board
  helper(board, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution;
  // create a board of n size;
  var board = new Board({ n: n });
  var hitTheBaseCase = false;

  // helper function with current board, pieceCount, rowCount
  var helper = function (currentBoard, pieceCount, rowCount) {
    //   base case if board has n pieces
    if (pieceCount === n) {
      //     increment solution count
      // debugger;
      solution = currentBoard.rows();
      solution = solution.slice();
      hitTheBaseCase = true;

      console.log('base case solution, ', solution);
      return solution;
    }
    //   recursive case
    //    nested for loop
    for (var row = rowCount; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //      place piece on board if no conflicts;
        currentBoard.rows()[row][col] = 1;
        if (currentBoard.hasAnyQueensConflicts()) {
          currentBoard.rows()[row][col] = 0;
        } else {
          //      run helper function on current board, pieceCount +1, rowCount + 1;
          helper(currentBoard, pieceCount + 1, row + 1);
          console.log('current Board, ', currentBoard);
          console.log( 'board, ', board);
          console.log('solution', solution);
          if (hitTheBaseCase) { return; }
          currentBoard.rows()[row][col] = 0;

        }
      }
    }
    console.log('solution =, ', solution);
  };

  // run the helper function on the empty board
  debugger;
  helper(board, 0, 0);

  console.log('Single solution for ' + n + ' queens:', solution);
  console.log(solution);
  if (!solution) {
    return board.rows();
  }
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  // create a board of n size;
  var board = new Board({ n: n });

  // helper function with current board, pieceCount, rowCount
  var helper = function (currentBoard, pieceCount, rowCount) {
    //   base case if board has n pieces
    if (pieceCount === n) {
      //     increment solution count
      solutionCount++;
    }
    //   recursive case
    //    nested for loop
    for (var row = rowCount; row < n; row++) {
      for (var col = 0; col < n; col++) {
        //      place piece on board if no conflicts;
        currentBoard.rows()[row][col] = 1;
        if (currentBoard.hasAnyQueensConflicts()) {
          currentBoard.rows()[row][col] = 0;
        } else {
          helper(currentBoard, pieceCount + 1, row + 1);
          currentBoard.rows()[row][col] = 0;

        }
      }
    }
    //      run helper function on current board, pieceCount +1, rowCount + 1;
  };

  // run the helper function on the empty board
  helper(board, 0, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
