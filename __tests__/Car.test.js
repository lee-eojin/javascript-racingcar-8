import Car from '../src/entities/Car.js';

describe('Car', () => {
  test('생성 시 position은 0이다', () => {
    const car = new Car('pobi');
    expect(car.getPosition()).toBe(0);
  });

  test('move 호출 시 position이 1 증가', () => {
    const car = new Car('pobi');
    car.move();
    expect(car.getPosition()).toBe(1);
  });

  test('move를 여러 번 호출하면 position이 누적', () => {
    const car = new Car('pobi');
    car.move();
    car.move();
    car.move();
    expect(car.getPosition()).toBe(3);
  });

  test.each([
    [5, 5, true],
    [3, 5, false],
    [0, 0, true],
  ])('position %i, maxPosition %i일 때 isWinner는 %s를 반환', (position, maxPosition, expected) => {
    const car = new Car('pobi');
    for (let i = 0; i < position; i++) {
      car.move();
    }
    expect(car.isWinner(maxPosition)).toBe(expected);
  });
});
