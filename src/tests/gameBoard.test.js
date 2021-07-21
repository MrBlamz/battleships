import GameBoard from '../gameBoard';

describe('GameBoard', () => {
  it('adds a ship in the given coordinates', () => {
    const gameBoard = GameBoard();
    gameBoard.add(5, 0, 0, 'horizontal');
    expect(gameBoard.getCoords(0, 0)).not.toBe(null);
    expect(gameBoard.getCoords(4, 0)).not.toBe(null);
    expect(gameBoard.getCoords(5, 2)).toBe(null);
  });

  it("doesn't add a ship if any of the coordinates is already populated", () => {
    const gameBoard = GameBoard();
    gameBoard.add(5, 2, 4, 'horizontal');
    gameBoard.add(4, 3, 1, 'vertical');
    expect(gameBoard.getCoords(3, 1)).toBe(null);
  });

  it("doesn't add a ship if it's coordinates are out of bounds", () => {
    const gameBoard = GameBoard();
    gameBoard.add(4, 8, 1, 'horizontal');
    expect(gameBoard.getCoords(9, 1)).toBe(null);
  });

  it('receiveAttack() hits a ship when the given coordinates are populated', () => {
    const gameBoard = GameBoard();
    gameBoard.add(5, 2, 4, 'horizontal');
    gameBoard.receiveAttack(4, 4);
    const expected = [false, false, true, false, false];
    expect(gameBoard.getCoords(4, 4).hitPositions).toStrictEqual(expected);
  });

  it("receiveAttack() records the coordinates when it's a missed shot", () => {
    const gameBoard = GameBoard();
    gameBoard.add(4, 6, 3, 'horizontal');
    gameBoard.receiveAttack(4, 4);
    expect(gameBoard.getMissedShots()).toStrictEqual([{ x: 4, y: 4 }]);
  });

  it('receiveAttack() increments missedShots on a missed shot', () => {
    const gameBoard = GameBoard();
    gameBoard.add(3, 3, 6, 'vertical');
    gameBoard.receiveAttack(2, 5);
    gameBoard.receiveAttack(3, 8);
    gameBoard.receiveAttack(7, 2);
    expect(gameBoard.getMissedShots()).toHaveLength(2);
  });

  it('hasShips() should returns true if not all ships have been sunk', () => {
    const gameBoard = GameBoard();
    gameBoard.add(2, 0, 0, 'horizontal');
    gameBoard.add(4, 3, 6, 'vertical');
    gameBoard.add(6, 3, 2, 'horizontal');
    expect(gameBoard.hasShips()).toBe(true);
  });

  it('hasShips() should returns false if all ships have been sunk', () => {
    const gameBoard = GameBoard();
    gameBoard.add(2, 0, 0, 'horizontal');
    gameBoard.add(4, 3, 6, 'vertical');
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(3, 8);
    gameBoard.receiveAttack(3, 7);
    gameBoard.receiveAttack(3, 9);
    gameBoard.receiveAttack(3, 6);
    expect(gameBoard.hasShips()).toBe(false);
  });
});
