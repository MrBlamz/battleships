const Ship = function Ship(size) {
  const length = size;
  const hitPositions = new Array(length).fill(false);

  function hit(position) {
    const inRange = position >= 0 && position < length;
    if (inRange) hitPositions[position] = true;
  }

  function isSunk() {
    return hitPositions.every((position) => position === true);
  }

  return {
    length,
    hitPositions,
    hit,
    isSunk,
  };
};

export default Ship;
