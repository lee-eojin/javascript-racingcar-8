import Car from "./Car.js";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const playerNames = await inputView.readCarNames();
    this.#validateNames(playerNames);

    const count = await inputView.readCount();
    this.#validateCount(count);

    const cars = playerNames.map((name) => new Car(name));

    outputView.printStart();
    for (let i = 0; i < count; i++) {
      cars.forEach(car => car.tryMove());
      outputView.printRound(cars);
    }

    const winners = this.#findWinners(cars);
    outputView.printWinners(winners);
  }

  #validateNames(names) {
    for (const name of names) {
      if (name.length > 5) {
        throw new Error("[ERROR] 이름은 5자 이하여야 합니다.");
      }
    }
  }

  #validateCount(count) {
    if (Number.isNaN(count) || count < 1) {
      throw new Error("[ERROR] 유효한 횟수를 입력해주세요.");
    }
  }

  #findWinners(cars) {
     const maxPosition = Math.max(...cars.map(car => car.getPosition()));
     return cars
     .filter(car => car.getPosition() === maxPosition)
     .map(car => car.getName());
  };
}

export default App;
