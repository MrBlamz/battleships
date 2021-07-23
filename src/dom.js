const DOM = (function DOM() {
  const playerBoardContainer = document.querySelector('.player-gameboard');
  const computerBoardContainer = document.querySelector('.computer-gameboard');

  function createGameBoard(gameBoard) {
    const board = document.createElement('div');
    board.classList.add('gameboard');

    for (let x = 0; x <= 9; x += 1) {
      const column = document.createElement('div');
      column.classList.add('column');

      for (let y = 0; y <= 9; y += 1) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-coordinate', `${x},${y}`);
        const isShip = gameBoard.getCoords(x, y);
        if (isShip) square.classList.add('ship');
        column.appendChild(square);
      }

      board.appendChild(column);
    }

    return board;
  }

  function renderGameBoards(player, computer) {
    const playerBoard = createGameBoard(player);
    const computerBoard = createGameBoard(computer);
    playerBoardContainer.appendChild(playerBoard);
    computerBoardContainer.appendChild(computerBoard);
  }

  function triggerPlayOnGameBoardClick(fn) {
    computerBoardContainer
      .querySelectorAll('.square')
      .forEach((square) =>
        square.addEventListener('click', fn, { once: true })
      );
  }

  function getPlayerBoardSquare(x, y) {
    let result;
    const squares = playerBoardContainer.querySelectorAll('.square');

    for (let i = 0; i < squares.length; i += 1) {
      const coords = squares[i].getAttribute('data-coordinate').split(',');
      const squareX = parseInt(coords[0], 10);
      const squareY = parseInt(coords[1], 10);
      if (x === squareX && y === squareY) {
        result = squares[i];
        break;
      }
    }

    return result;
  }

  function setSuccessfulHit(target) {
    target.classList.add('ship-hit');
  }

  function setMissedShot(target) {
    target.classList.add('missed-shot');
  }

  return {
    renderGameBoards,
    triggerPlayOnGameBoardClick,
    getPlayerBoardSquare,
    setSuccessfulHit,
    setMissedShot,
  };
})();

export default DOM;
