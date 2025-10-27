import Car from '../src/entities/Car.js';

describe('Car', () => {
  it('생성 시 position은 0', () => {
    const car = new Car('pobi');
    expect(car.getPosition()).toBe(0);
  });

  it('move 호출 시 position이 1 증가', () => {
    const car = new Car('pobi');
    car.move();
    expect(car.getPosition()).toBe(1);
  });

  it('move를 여러 번 호출하면 position이 누적', () => {
    const car = new Car('pobi');
    car.move();
    car.move();
    car.move();
    expect(car.getPosition()).toBe(3);
  });

  describe('isWinner', () => {
    it.each([
      ['eojin', 5, 5, true], // 우승
      ['lej', 3, 5, false], // 우승못함
      ['pobi', 0, 0, true], // 공동우승함
    ])('우승 여부 정확히 판단', (name, position, maxPosition, expected) => {
      const car = new Car(name);
      for (let i = 0; i < position; i++) {
        car.move();
      }
      expect(car.isWinner(maxPosition)).toBe(expected);
    });
  });
});
