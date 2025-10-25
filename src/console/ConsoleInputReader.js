import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants.js';

class ConsoleInputReader {
  async readNames() {
    const namesInput = await Console.readLineAsync(MESSAGES.INPUT_NAMES);
    return namesInput.split(',').map((name) => name.trim());
  }

  async readRoundCount() {
    const roundCountInput = await Console.readLineAsync(MESSAGES.INPUT_ROUND_COUNT);
    const roundCount = Number(roundCountInput);
    this.#validateRoundCount(roundCount);
    return roundCount;
  }

  #validateRoundCount(roundCount) {
    if (!Number.isInteger(roundCount) || roundCount < 1) {
      throw new Error(MESSAGES.ERROR_ROUND_COUNT);
    }
  }
}

export default ConsoleInputReader;
