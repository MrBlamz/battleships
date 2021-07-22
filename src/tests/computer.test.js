import Computer from '../computer';

describe('Computer', () => {
  it('makes a random play', () => {
    const computer = Computer();
    computer.makePlay();
    expect(computer.getPlays()).toHaveLength(1);
  });

  it('does not make a repeated play', () => {
    const computer = Computer();
    for (let i = 0; i < 100; i += 1) {
      computer.makePlay();
    }
    expect(computer.getPlays()).toHaveLength(100);
  });
});
