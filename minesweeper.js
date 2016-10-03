document.addEventListener('DOMContentLoaded', startGame)


// Define your `board` object here!
var board = {
  cells:  [
  //     //   row: 0,
  //     //   col: 0,
  //     //   isMine: true,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 0,
  //     //   col: 1,
  //     //   isMine: false,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 0,
  //     //   col: 2,
  //     //   isMine: true,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 1,
  //     //   col: 0,
  //     //   isMine: false,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 1,
  //     //   col: 1,
  //     //   isMine: false,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 1,
  //     //   col: 2,
  //     //   isMine: false,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 2,
  //     //   col: 0,
  //     //   isMine: true,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 2,
  //     //   col: 1,
  //     //   isMine: true,
  //     //   hidden: true
  //     // },
  //     // {
  //     //   row: 2,
  //     //   col: 2,
  //     //   isMine: true,
  //     //   hidden: true
  //     // }
]
};

var newBoard = prompt("Enter a number between 3 and 6");

function startGame () {


  //if user doesn't enter a number between 3 and 6, or NaN, retry.
  while (newBoard < 3 || newBoard > 6 || newBoard === NaN || newBoard === null) {
    newBoard = prompt("Please choose a number between 3 and 6")
  };


// function to make new board
  makeNewBoard(newBoard, newBoard);


//gets surrounding mines and counts them
for (var i = 0; i < board.cells.length; i++) {
  var countSM = countSurroundingMines(board.cells[i])
board.cells[i].surroundingMines = countSM;
}

// Don't remove this function call: it makes the game work!
lib.initBoard()

//checkForWin on click
document.addEventListener("click", checkForWin);
//checkForWin on right click
document.addEventListener("contextmenu", checkForWin);

document.addEventListener("click", bombCheck);
}
//each square. use the "this" call. Each cell will need row, col, isMine, isMarked, and hidden properties.

function eachSquare(row, col, isMine, isMarked, hidden) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden;
}

//makes board
function makeNewBoard(width, height) {
  var row = 0;

  for (var i = 0; i < height; i++) {
    var col = 0;

    for (var j = 0; j < width; j++) {
      square = new eachSquare(row, col, randomMine(), false, true);
      console.log(square);
      board.cells.push(square);
      col++;
    }
    row++;
  }
}

//random mine function
function randomMine() {
  var randomNum = Math.floor((Math.random() * 100) + 1);
  if (randomNum < 70) {
    return false;
  }
  else {
    return true;
  }
}

function bombCheck(evt) {

  var specificCell = getCellIndex(getRow(evt.target), getCol(evt.target))
  var cell = board.cells[specificCell]

  var audio = document.getElementById("failure");

  if (cell.isMine === true) {
    audio.play();
  }
  // if (cell.isMine === true) {
  //   document.getElementsByClassName("mine").style.borderColor="red";
  // }
}

function checkForWin () {

   for (var i = 0; i < board.cells.length; i++) {

if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
   return;
 }
}

 for (var i = 0; i < board.cells.length; i++) {
if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
  return;
}
}

  lib.displayMessage('You win!');

  var audio = document.getElementById("success");
  audio.play();
}

var reset = document.getElementById('reset');
reset.addEventListener('click', function(evt) {
  location.reload()
 });
// var mineClick = document.getElementById(isMine);
//
// isMine.onclick = function () {
//
//   if (isMine === true) {
//   mineClick.style.border = "red";
// }
// }



  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surround = lib.getSurroundingCells(cell.row, cell.col);
var count = 0;
  for (var i = 0; i < surround.length; i++) {
    if (surround[i].isMine === true) {
      count = count + 1;
    }
  }
  return count;
}


// reset = new Button("reset");
// reset.addActionListener (resetButton());
//
// function resetButton() {
// newBoard;
// makeNewBoard;
