const Gameboard = (function() {
  const gameboard = [[[' '],[' '],[' ']], [[' '],[' '],[' ']], [[' '],[' '],[' ']]]
  const getGameboard = () => gameboard;

  const winner = function(){
    if(checkWinnerRows()||checkWinnerColumns()||checkWinnerDiagonals()){
      return true
    }
    return false
  }; 

  const checkWinnerRows = function(){  
    let winner = false; 
    gameboard.forEach((row) => {
      if(row[0] == row[1] && row[1] == row[2] && row[2] != ' '){
        winner = true
      }
    });
    return winner
  }

  const checkWinnerColumns = function(){
    let winner = false; 
    for (let i = 0; i < 3; i++) {
      if( gameboard[0][i] == gameboard[1][i] &&
          gameboard[1][i] == gameboard[2][i] &&
          gameboard[0][i] != ' '){
        winner = true
      }
    }
    return winner
  }
       
  const checkWinnerDiagonals = function(){
    let winner = false; 
    if( gameboard[0][0] == gameboard[1][1] &&
        gameboard[1][1] == gameboard[2][2] &&
        gameboard[0][0] != ' '){
      winner = true
    } else if(gameboard[0][2] == gameboard[1][1] &&
              gameboard[1][1] == gameboard[2][0] &&
              gameboard[0][2] != ' ') {
      winner = true
    } 
    return winner
  }

  const freeSpace = function(x, y){
    if(gameboard[x][y] == ' '){
      return true
    } 
    return false
  };

  const markSpace = function(mark, row, column){
    if(freeSpace(row, column)){
      gameboard[row][column] = mark
    }
  };
  return { winner, markSpace, getGameboard,freeSpace }
})();

function Player (mark) {
  const name = prompt("Insert the name of the player:") 
  const getName = () => name;
  const selectSpace = function(row,column){
    Gameboard.markSpace(mark, row, column)
  }
  return { getName, selectSpace }; 
}



const Game = (function() {
  const player1 = Player('X');
  const player2 = Player('O');
  let currentPlayer = player1;
  const getCurrentPlayer = () => currentPlayer;
  let i = 0;

  const turn = function (row, column){
    currentPlayer.selectSpace(row, column);
    currentPlayer = [player1,player2][i%2];
    i++;
    if(!Gameboard.winner()){
      currentPlayer = [player1,player2][i%2];
    } 
    return i
  }
  return { getCurrentPlayer, turn }
})();



const ScreenController = (function(){
 
  const playerTurnDiv = document.querySelector('.turn');
  const gameboardDiv = document.querySelector(".gameboard");
  const message = document.querySelector(".message");
  const resetButton = document.querySelector(".reset");

  const updateScreen = () => {
    gameboardDiv.textContent = "";
    const board = Gameboard.getGameboard()
    const activePlayer = Game.getCurrentPlayer();
    playerTurnDiv.textContent = `${activePlayer.getName()}'s turn...`

    board.forEach((row, rowIndex) => {
      const cellRow = document.createElement("div");
      gameboardDiv.appendChild(cellRow);
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex
        cellButton.textContent = cell ;
        cellRow.appendChild(cellButton);
      })
    })

    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      if (!selectedColumn || !selectedRow) return;
      
      if(!Gameboard.freeSpace(selectedRow,selectedColumn)){
        message.textContent = `${Game.getCurrentPlayer().getName()} select an empty space`
      } else if(Game.turn(selectedRow, selectedColumn) > 8 && !Gameboard.winner()){
        blockBoard();
        message.textContent = `It is a tied.`
      } else if(Gameboard.winner()) {
        blockBoard();
        message.textContent = `${Game.getCurrentPlayer().getName()}: you are the winner!`;
      }
      updateScreen();
    }

    gameboardDiv.querySelectorAll("div > button ").forEach((cell)=>{
      cell.addEventListener("click", clickHandlerBoard);
    });
    
    const blockBoard = function(){
      gameboardDiv.querySelectorAll("div > button ").forEach((cell)=>{
        cell.removeEventListener("click", clickHandlerBoard);
      });
    }

    const resetGame = function(e) {
      history.go(0);
    }
    resetButton.addEventListener("click",resetGame);
  }

  updateScreen();
})();


