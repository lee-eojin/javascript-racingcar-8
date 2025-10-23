import { Random } from '@woowacourse/mission-utils';
import Car from '../entity/Car.js';
import NameValidator from '../entity/NameValidator.js';
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
    this.#cars.forEach((car) => this.#moveCarIfPossible(car));
  }

  #moveCarIfPossible(car) {
    if (this.#checkMoveCondition()) {
      car.move();
    }
  }

  #checkMoveCondition() {
    const randomValue = Random.pickNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER);
    return randomValue >= MIN_FORWARD_VALUE;
  }

  getCars() {
    return [...this.#cars];
  }

  getWinners() {
    const maxPosition = this.#calculateMaxPosition();
    return this.#cars.filter((car) => car.getPosition() === maxPosition);
  }

  #calculateMaxPosition() {
    return Math.max(...this.#cars.map((car) => car.getPosition()));
  }
}

export default RaceController;
