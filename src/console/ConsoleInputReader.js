import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants.js';

class ConsoleInputReader {
  async readNames() {
    const namesInput = await Console.readLineAsync(MESSAGES.INPUT_NAMES);
    return namesInput.split(',').map((name) => name.trim());
  }

  async readRoundCount() {
    const roundCountInput = await Console.readLineAsync(MESSAGES.INPUT_ROUND_COUNT);
    return Number(roundCountInput);
  }
}

export default ConsoleInputReader;
