import { Random } from "@woowacourse/mission-utils";

class Car {
  #name;
  #position = 0;

  constructor(name) {
    this.#name = name;
  }

  tryMove() {
    if (Random.pickNumberInRange(0, 9) >= 4) {
      this.#position += 1;
    }
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  getResult() {
    return `${this.#name} : ${"-".repeat(this.#position)}`;
  }
}

export default Car;
