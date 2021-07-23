import Player from './player';
import Computer from './computer';
import GameBoard from './gameBoard';
import DOM from './dom';
import { generateRandomNumber } from './helpers';

const Game = (function Game() {
  const player = Player();
  const playerBoard = GameBoard();
  const computer = Computer();
  const computerBoard = GameBoard();
  let hasWinner = false;

  function addShips(gameBoard) {
    gameBoard.fill();
  }

  function drawStartingPlayer() {
    const rnd = generateRandomNumber(1);

    if (rnd) {
      player.changeTurn();
    } else {
      computer.changeTurn();
    }
  }

  function nextTurn() {
    player.changeTurn();
    computer.changeTurn();
  }

  function computerPlay() {
    if (computer.isTurn() && !hasWinner) {
      const coords = computer.makePlay();
      const { x, y } = coords;
      const isShip = playerBoard.getCoords(x, y);
      playerBoard.receiveAttack(x, y);

      if (isShip) {
        DOM.setSuccessfulHit(DOM.getPlayerBoardSquare(x, y));
      } else {
        DOM.setMissedShot(DOM.getPlayerBoardSquare(x, y));
      }

      if (!playerBoard.hasShips()) {
        DOM.popUpModal('Computer');
        hasWinner = true;
      } else {
        nextTurn();
      }
    }
  }

  function playerPlay(event) {
    if (player.isTurn() && !hasWinner) {
      const coords = event.target.getAttribute('data-coordinate').split(',');
      const x = parseInt(coords[0], 10);
      const y = parseInt(coords[1], 10);

      // getCoords is called first cause if receive attack has a ship in it's
      // cords and the ship is sunk it will remove it from board returning null
      // to getCoords
      const isShip = computerBoard.getCoords(x, y);
      computerBoard.receiveAttack(x, y);

      if (isShip) {
        DOM.setSuccessfulHit(event.target);
      } else {
        DOM.setMissedShot(event.target);
      }

      if (!computerBoard.hasShips()) {
        DOM.popUpModal('Player');
        hasWinner = true;
      } else {
        nextTurn();
        computerPlay();
      }
    }
  }

  function restartGame() {
    playerBoard.reset();
    computerBoard.reset();
    hasWinner = false;
    addShips(playerBoard);
    addShips(computerBoard);
    DOM.renderGameBoards(playerBoard, computerBoard);
    DOM.triggerPlayOnGameBoardClick(playerPlay);
    computerPlay();
  }

  function start() {
    addShips(playerBoard);
    addShips(computerBoard);
    DOM.renderGameBoards(playerBoard, computerBoard);
    drawStartingPlayer();
    DOM.triggerPlayOnGameBoardClick(playerPlay);
    DOM.triggerGameRestartOnModalBtnClick(restartGame);
    computerPlay();
  }

  return { start };
})();

export default Game;
