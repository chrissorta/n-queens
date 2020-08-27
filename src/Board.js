// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var row = this.get(rowIndex);
      //create a count var
      var count = 0;
      //iterate over the row array
      for (var i = 0; i < row.length; i++) {
        //  if the item === 1, increment the count
        if (row[i] === 1) {
          count++;
        }
        if (count > 1) {
          //  check if the count grater than 1, if yes return true;
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var board = this.rows();
      //loop over the board
      for (var i = 0; i < board.length; i++) {
        // check if hasRowConflictAt(i) returns true
        if (this.hasRowConflictAt(i)) {
          // if yes, return true;
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // get the board
      var board = this.rows();
      // create counter variable
      var count = 0;
      // iterate over column array
      for (var i = 0; i < board.length; i++) {
        // if find 1
        if (board[i][colIndex] === 1) {
          //  increment count
          count++;
        }
        // if count > 1
        if (count > 1) {
          //  return true;
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      // create a board
      var board = this.rows();
      // iterate over board length
      for (var i = 0; i < board.length; i++) {
        //   call colConflict(i)
        if (this.hasColConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      //create a board var
      var board = this.rows();
      //create a var colIndex;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      //create a var for rowIndex;
      var rowIndex = 0;
      //if majorDiagonalColumnIndexAtFirstRow < 0
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        //  assign rowIndex to Math.abs(majorDiagonalColumnIndexAtFirstRow)
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        //assign colIndex to 0
        colIndex = 0;
      }
      //create a count var
      var count = 0;
      //loop over the board starting from 0 until board.length-Math.abs(majorDiagonalColumnIndexAtFirstRow)
      for (var i = 0; i < board.length - Math.abs(majorDiagonalColumnIndexAtFirstRow); i++) {
        //  if the board[rowIndex][colIndex] === 1, increment the count
        if (board[rowIndex][colIndex] === 1) {
          count++;
        }
        if (count > 1) {
          //  if count > 1
          //    return true;
          return true;
        }
        //  increment rowIndex and colIndex
        rowIndex++;
        colIndex++;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // set starting index = negative board length + 1
      var index = this.rows().length * -1 + 1;
      // while loop until starting index < board.length
      while (index < this.rows().length) {
        // check if index in hasMajorDiagonalConflictAt true
        if (this.hasMajorDiagonalConflictAt(index)) {
          //  return true
          return true;
        }

        //increment index
        index++;
        //end of loop
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      //create a var colIndex where col = board length - 1;
      var colIndex = board.length - 1;
      //create a var for rowIndex where row = input - baord.length + 1;
      var rowIndex = minorDiagonalColumnIndexAtFirstRow - board.length + 1;
      // length = board * 2 - length - input - 1
      var length = 2 * board.length - minorDiagonalColumnIndexAtFirstRow - 1;
      //if input < board.length
      if (minorDiagonalColumnIndexAtFirstRow < board.length) {
        // assign row index to 0
        rowIndex = 0;
        // assign col index to input
        colIndex = minorDiagonalColumnIndexAtFirstRow;
        // assign length to input + 1
        length = minorDiagonalColumnIndexAtFirstRow + 1;
      }
      //create a count var
      var count = 0;
      //loop over the board starting from 0 until board.length-Math.abs(majorDiagonalColumnIndexAtFirstRow)
      for (var i = 0; i < length; i++) {
        //  if the board[rowIndex][colIndex] === 1, increment the count
        if (board[rowIndex][colIndex] === 1) {
          count++;
        }
        if (count > 1) {
          //  if count > 1
          //    return true;
          return true;
        }
        //  increment rowIndex and colIndex
        rowIndex++;
        colIndex--;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      // set starting index = negative board length + 1
      var index = 0;
      var length = this.rows().length * 2 - 1;
      // while loop until starting index < board.length
      while (index < length) {
        // check if index in hasMajorDiagonalConflictAt true
        if (this.hasMinorDiagonalConflictAt(index)) {
          //  return true
          return true;
        }

        //increment index
        index++;
        //end of loop
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
