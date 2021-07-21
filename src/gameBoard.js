import Ship from './ship';

const GameBoard = function GameBoard() {
  const ships = [];
  const missedShots = [];

  function calculateCoordinates(shipLength, x, y, direction) {
    const coords = [];

    for (let i = 0; i < shipLength; i += 1) {
      if (direction === 'horizontal') {
        coords.push({ x: x + i, y });
      } else {
        coords.push({ x, y: y + i });
      }
    }

    return coords;
  }

  function isEqualCoordinate(coordinate1, coordinate2) {
    return coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y;
  }

  function checkCoordinatesAvailability(newCoordinates) {
    let available = true;

    for (let i = 0; i < ships.length; i += 1) {
      const shipCoordinates = ships[i].coordinates;

      const result = newCoordinates.filter((newShipCoordinate) =>
        shipCoordinates.some((oldShipCoordinate) =>
          isEqualCoordinate(newShipCoordinate, oldShipCoordinate)
        )
      );

      if (result.length) {
        available = false;
        break;
      }
    }

    return available;
  }

  function isWithinBounds(coordinates) {
    return coordinates.every((coordinate) => {
      const { x, y } = coordinate;
      return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    });
  }

  function add(shipLength, x, y, direction) {
    const newCoordinates = calculateCoordinates(shipLength, x, y, direction);
    const isAvailable = checkCoordinatesAvailability(newCoordinates);
    const isInsideBoard = isWithinBounds(newCoordinates);

    if (isAvailable && isInsideBoard) {
      ships.push(Ship(shipLength, newCoordinates));
    }
  }

  function getCoords(xAxis, yAxis) {
    let result = null;

    for (let i = 0; i < ships.length; i += 1) {
      const shipCoords = ships[i].coordinates.filter((ShipCoordinate) =>
        isEqualCoordinate(ShipCoordinate, { x: xAxis, y: yAxis })
      );

      if (shipCoords.length) {
        result = ships[i];
        break;
      }
    }

    return result;
  }

  function indexOfShipCoordinate(coordinate, array) {
    let index = -1;

    for (let i = 0; i < array.length; i += 1) {
      if (isEqualCoordinate(array[i], coordinate)) {
        index = i;
        break;
      }
    }

    return index;
  }

  function indexOfShip(ship) {
    return ships.indexOf(ship);
  }

  function removeShip(ship) {
    const index = indexOfShip(ship);
    ships.splice(index, 1);
  }

  function addMissedShot(coordinate) {
    missedShots.push(coordinate);
  }

  function receiveAttack(x, y) {
    const ship = getCoords(x, y);

    if (ship) {
      const shipCoordinates = ship.coordinates;
      const index = indexOfShipCoordinate({ x, y }, shipCoordinates);
      ship.hit(index);
      if (ship.isSunk()) removeShip(ship);
      return;
    }

    addMissedShot({ x, y });
  }

  function getMissedShots() {
    return missedShots;
  }

  function hasShips() {
    return ships.length > 0;
  }

  return {
    add,
    getCoords,
    receiveAttack,
    getMissedShots,
    hasShips,
  };
};

export default GameBoard;
