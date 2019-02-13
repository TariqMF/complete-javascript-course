/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerScores, roundScore, activePlayer, gamePlaying, lastRoll, pointsToWin;

init();

/**
 * Roll die
 */
document.querySelector('.btn-roll').addEventListener('click', dice);

/**
 * Hold
 */
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying) {
        playerScores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = playerScores[activePlayer];
        if (playerScores[activePlayer] >= 100) {
            //somebody has won
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // alert('Player ' + (activePlayer + 1) + ' has won!');
            gamePlaying = false;
            document.querySelector('.dice').style.display = 'none';

        } else {
            changePlayer();
        }
    }
});

/**
 * New Game
 */
document.querySelector('.btn-new').addEventListener('click', init);



function dice(){
   let dice1 =  rollDice(1);
   let dice2 = rollDice(2);

    if(dice1 === 1 || dice2 === 1) {
        changePlayer();
    } else {
        roundScore+= dice1 + dice2;
        updateCurrentScore(roundScore);
    }
}


/**
 *
 * Roll dice
 */
function rollDice(id) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDom = document.querySelector('.dice-' + id);
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';
    return dice;
}

function init(){
    roundScore = 0;
    playerScores = [0,0];
    activePlayer = 0;
    lastRoll = 0;
    gamePlaying = true;
    if(document.querySelector('.win-condition').value > 0 ){
        pointsToWin = document.querySelector('.win-condition').value;
    } else {
        pointsToWin = 100;
    }
    for(let i = 0; i < playerScores.length; i++){
        document.getElementById('current-' + i).textContent = '0';
        document.getElementById('score-' + i).textContent = '0';
        document.getElementById('name-' + i).textContent = 'Player ' + (i + 1)
        document.querySelector('.player-'+ i +'-panel').classList.remove('winner');
        document.querySelector('.player-'+ i +'-panel').classList.remove('active');
    }
    document.querySelector('.player-'+ 0 +'-panel').classList.add('active');
}

/**
 * Resets the roundScore, updates the current score and changes the player
 */
function changePlayer(){
    roundScore = 0;
    lastRoll = 0;
    updateCurrentScore(roundScore);
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active');

}

function updateCurrentScore(score){
    document.querySelector('#current-' + activePlayer).textContent = score;
}

