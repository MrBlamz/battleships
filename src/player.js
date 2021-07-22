const Player = function Player() {
  let turn = false;

  function changeTurn() {
    turn = turn === false;
  }

  function isTurn() {
    return turn;
  }

  return {
    changeTurn,
    isTurn,
  };
};

export default Player;
