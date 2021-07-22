import Player from '../player';

describe('Player', () => {
  it("isTurn() returns true if it's player's turn", () => {
    const p1 = Player();
    p1.changeTurn();
    expect(p1.isTurn()).toBe(true);
  });

  it("isTurn() returns false if it's not player's turn", () => {
    const p1 = Player();
    expect(p1.isTurn()).toBe(false);
  });
});
