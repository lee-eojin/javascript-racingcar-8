import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants.js';

class ConsoleInputReader {
  async readCarNames() {
    const carNamesInput = await Console.readLineAsync(MESSAGES.INPUT_CAR_NAMES);
    return carNamesInput.split(',').map((name) => name.trim());
  }

  async readRoundCount() {
    const roundCountInput = await Console.readLineAsync(MESSAGES.INPUT_ROUND_COUNT);
    return Number(roundCountInput);
  }
}

export default ConsoleInputReader;
