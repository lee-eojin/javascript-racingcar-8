import { Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {

  async run() {

    const inputView = new InputView();
    const outputView = new OutputView();

    const carNames = await this.#readCarNames(inputView);
    const tryCount = await this.#readTryCount(inputView);






  }

  async #readCarNames(inputView) {
    const input = await inputView.readCarNames();
    const names = input.split(",").map(s => s.trim());
    this.#validateCarNames(names);
    return names;
  }

  #validateCarNames(names) {
    if (names.some(name => name.length > 5)) {
      throw new Error("[ERROR] 이름은 5글자 이하여야 합니다.")
    }
  }

  async #readTryCount(inputView) {

  }



}

export default App;