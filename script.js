const spaces = document.querySelectorAll(".gameboard > div > div")

spaces.forEach(function (item, idx) {
  item.addEventListener('click', function () {
      console.log(item.dataset);
      console.log(item.parentNode.dataset)
  });
});



const Gameboard = (function() {
  const gameboard = [[[' '],[' '],[' ']], [[' '],[' '],[' ']], [[' '],[' '],[' ']]]

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

  const markSpace = function(mark){
    let x = Number(prompt('x'))
    let y = Number(prompt('y'))

    while(!freeSpace(x, y)){
      x = Number(prompt('ingrese x'))
      y = Number(prompt('ingrese y'))
    }
    gameboard[x][y] = mark
    displayController()
  };

  const displayController = function(){
    console.log(`
    
         ${gameboard[0][0]} | ${gameboard[0][1]} | ${gameboard[0][2]}
      ------------
         ${gameboard[1][0]} | ${gameboard[1][1]} | ${gameboard[1][2]}
      ------------
         ${gameboard[2][0]} | ${gameboard[2][1]} | ${gameboard[2][2]}
    `)
  };


  return { winner, markSpace }
})();

function Player (mark) {
  const name = prompt() 

  const selectSpace = function(){
    Gameboard.markSpace(mark)
  }

  return { name, selectSpace }; 
}

const Game = (function() {

  const player1 = Player('X');
  const player2 = Player('O');

  const play = function(){
    let i = 0;
    while (!Gameboard.winner() && i<9) { 
      turn([player1,player2][i%2]);
      i++;
    }
    if (Gameboard.winner()) {
      console.log(`${[player1,player2][(i-1)%2]} ${[player1,player2][(i-1)%2].name} you are the winner`)
    } else {
      console.log(`It is a tied`)
    }
    
  }

  const turn = function(player) {
    player.selectSpace();
  }

  return { play }
})();

//Game.play();