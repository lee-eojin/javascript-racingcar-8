import { Random } from '@woowacourse/mission-utils';
import Car from '../entities/Car.js';
import NameValidator from '../entities/NameValidator.js';
import { RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER, MIN_FORWARD_VALUE } from '../constants.js';

class RaceController {
  #cars;

  constructor() {
    this.#cars = [];
  }

  initCars(names) {
    new NameValidator().validateNames(names);
    this.#cars = names.map((name) => new Car(name));
  }

  playGame(roundCount, onRoundComplete) {
    for (let i = 0; i < roundCount; i++) {
      this.#playRound();
      onRoundComplete(this.getCars());
    }
  }

  #playRound() {
    this.#cars.forEach((car) => {
      const randomValue = Random.pickNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER);
      if (randomValue >= MIN_FORWARD_VALUE) {
        car.move();
      }
    });
  }

  getCars() {
    return [...this.#cars];
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));
    return this.#cars.filter((car) => car.isWinner(maxPosition));
  }
}

export default RaceController;
