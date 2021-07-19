import Ship from '../ship';

describe('Ship', () => {
  it('constructs a ship with the given length', () => {
    const ship = Ship(3);
    const secondShip = Ship(6);
    expect(ship).toHaveLength(3);
    expect(secondShip).toHaveLength(6);
  });

  it('hit() marks a hit in the ship in the given position', () => {
    const ship = Ship(3);
    ship.hit(2);
    expect(ship.hitPositions).toStrictEqual([false, false, true]);
  });

  it('hit() does not work when the given position is outside of range', () => {
    const ship = Ship(3);
    ship.hit(3);
    expect(ship.hitPositions).toStrictEqual([false, false, false]);
  });

  it('isSunk() returns true if the ship has all positions hit', () => {
    const ship = Ship(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
  });

  it("isSunk() returns false if the ship doesn't have all positions hit", () => {
    const ship = Ship(6);
    ship.hit(5);
    expect(ship.isSunk()).toBe(false);
  });
});
