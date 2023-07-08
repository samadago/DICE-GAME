const diceSide = document.getElementById("diceSide");

const newGame = document.getElementById("newGame");
const rollDiceLink = document.getElementById("rollDiceLink");
const holdLink = document.getElementById("holdLink");

const printPlayer = document.getElementsByClassName("printPlayer");
const infoWinner = document.getElementById("bestWinner");
const emoji = ["😃", "🙁"];

let diceNumbers = [1, 2, 3, 4, 5, 6]; 
let diceRolling = 0;

let activePlayer; 

let roundScoreText;
let roundScore; 
let globalScoreText;
let globalScore;



/*   class Game  */

class Game {

    constructor(players) {
        this.players = players;
    }
}


/*   class Dice  */


class Dice {

    constructor(diceRolling, diceNumbers) {
        this.diceRolling = diceRolling; 
        this.diceNumbers = diceNumbers;
    }

    /** image of the dice **/

    getImage(valeur) {
        let imgTxt = "image/"; 

        switch(valeur) {
            case 1: imgTxt += "dice1.svg";
            break;
            case 2: imgTxt += "dice2.svg";
            break;
            case 3: imgTxt += "dice3.svg";
            break;
            case 4: imgTxt += "dice4.svg";
            break;
            case 5: imgTxt += "dice5.svg";
            break;
            case 6: imgTxt += "dice6.svg";
            break;
            default: console.log("Error : no image.");
        }
        return imgTxt;
    }

    /*** Print the result of the dice rolling * */

    printDice() {
        var txt = ""; 
        txt += "<div>"; 
        txt += "<img src=' " + this.getImage(diceRolling) + " ' style='width: 6rem; height: 6rem; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; '>";
        txt += "</div>";
        diceSide.innerHTML = txt; 
    }
}



/*   class Player */


class Player {

    constructor(name, dice, roundScore, globalScore) {
        this.name = name;
        this.dice = dice;
        this.roundScore = roundScore; 
        this.globalScore = globalScore;
    }

    /*  the identity  */

    getIdentity() {
        return `${this.name}`;
    }

    /*  Roll the dice  */

    rollTheDice(diceResult) {
        diceResult = this.dice.diceNumbers;
        diceRolling = diceResult[Math.floor(Math.random() * diceResult.length)];

        this.printRedDot() ;
        this.dice.printDice();

        if(diceRolling === 1) {
            this.skipTheTurn();
        } else {
            this.addRoundScore(diceRolling); 
        }

        return diceRolling;
    }

    /*   Skip the turn   */

    skipTheTurn() {    
        alert(`The ${this.getIdentity()} misses his turn !  ${emoji[1]}`);

        this.roundScore = 0;
        roundScoreText = document.getElementById("roundScoreP2").innerHTML = this.roundScore;
        this.switchPlayer();
    }

    /*   Switch the player  */

    switchPlayer() {
        if(activePlayer === player1) {
            this.roundScore = 0;
            roundScoreText = document.getElementById("roundScoreP1").innerHTML = this.roundScore;
            activePlayer = player2; 
        } else {
            this.roundScore = 0;
            roundScoreText = document.getElementById("roundScoreP2").innerHTML = this.roundScore;
            activePlayer = player1; 
        }
        return activePlayer; 
    }

    /*   print the red dot   */

    printRedDot() {
        for (var i = 0; i < printPlayer.length; i++) {
            printPlayer[i].style.display = "none";
        }

        if(activePlayer === player1) {
            document.getElementById("dotP1").style.display = "block";
            document.getElementById("dotP2").style.display = "none";
            document.getElementById("player1").style.color = "#161A1D";
            document.getElementById("player1").style.fontWeight = "normal";
            document.getElementById("player2").style.fontWeight = "lighter";
            document.getElementById("player2").style.color = "#8f8f8f";
        } else {
            document.getElementById("dotP2").style.display = "block";
            document.getElementById("dotP1").style.display = "none";
            document.getElementById("player2").style.color = "#161A1D";
            document.getElementById("player1").style.color = "#8f8f8f";
            document.getElementById("player1").style.fontWeight = "lighter";
            document.getElementById("player2").style.fontWeight = "normal";
        }
    }

    /*   Add the round score   */

    addRoundScore(diceResult) {
        this.roundScore += diceResult;

        if(activePlayer === player1){
            roundScore = this.roundScore; 
            roundScoreText = document.getElementById("roundScoreP1").innerHTML = this.roundScore;
        } else {
            roundScore = this.roundScore; 
            roundScoreText = document.getElementById("roundScoreP2").innerHTML = this.roundScore;
        }
        return this.roundScore;
    }

    /*  Add the global score   */

    addGlobalScore(roundsadded) {
        if(roundsadded == null){
            roundsadded = 0;
        }
        this.globalScore += roundsadded;
        
        if(activePlayer === player1 && this.globalScore > 0) {
            globalScore += this.globalScore;
            globalScoreText = document.getElementById("globalScoreP1").innerHTML = this.globalScore;
        } else {
            globalScore += this.globalScore;
            globalScoreText = document.getElementById("globalScoreP2").innerHTML = this.globalScore;
        }

        this.getTheWinner();
        this.switchPlayer();

        return this.globalScore;
    }

    /*   Get the winner   */

    getTheWinner() {
        if (this.globalScore >= 100) {
            infoWinner.innerHTML = `The ${activePlayer.name} wins the game !  ${emoji[0]}`;
            setTimeout(window.location.reload.bind(window.location), 4000);
        }
    }
}




/*  Main  */



/*  Class instances  */

let dice = new Dice(diceRolling, diceNumbers); 
let player1 = new Player("Player 1", dice,  0, 0);
let player2 = new Player("Player 2", dice, 0, 0); 
let game = new Game([player1, player2]); 

activePlayer = player1; 


/*  Click Events */

try {

    newGame.addEventListener("click",() => location.reload(), false); 

    rollDiceLink.addEventListener("click", () => {
        activePlayer.rollTheDice(diceNumbers) }, false);

    holdLink.addEventListener("click", () => {
        activePlayer.addGlobalScore(roundScore)}, false);

} catch(err) {
    alert(`Error has occurred!`);
}

