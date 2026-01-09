import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const cars = await inputView.readCars();
    // 그럼 여기에 ["pobi" , "woni"] 가 나왔을것임.

    this.#validateCarName(cars);
    // 그럼 이제 자동차 이름을 검증해야함.
  }

  #validateCarName(names) {
    if (names.some((name) => name.length > 5)) {
      throw new Error("[ERROR] 이름은 5글자 이하여야 합니다.");
    }
  }
}

export default App;
