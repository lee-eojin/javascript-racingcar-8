import { Console, Random } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const carNames = await this.#readCarNames(inputView);
    const tryCount = await this.#readTryCount(inputView);

    const cars = carNames.map((name) => ({ name, position: 0 }));

    outputView.printStart();

    for (let i = 0; i < tryCount; i++) {
      cars.forEach((car) => this.#tryMoveCar(car));
      outputView.printRound(cars);
    }
    const winners = this.#findWinners(cars);
    outputView.printWinners(winners);
  }

  #findWinners(cars) {
    const maxPosition = Math.max(...cars.map((car) => car.position));

    return cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name)
      .join(",");
  }

  #tryMoveCar(car) {
    const randomNumber = Random.pickNumberInRange(0, 9);

    if (randomNumber >= 4) {
      car.position++;
    }
  }

  async #readCarNames(inputView) {
    const input = await inputView.readCarNames();
    const names = input.split(",").map((s) => s.trim());
    this.#validateCarNames(names);
    return names;
  }

  #validateCarNames(names) {
    if (names.some((name) => name.length > 5)) {
      throw new Error("[ERROR] 이름은 5글자 이하여야 합니다.");
    }
  }

  async #readTryCount(inputView) {
    const count = await inputView.readTryCount();
    this.#validateTryCount(count);
    return count;
  }

  #validateTryCount(count) {
    if (Number.isNaN(count)) {
      throw new Error("[ERROR] 숫자를 입력해주세요.");
    }
  }
}

export default App;
