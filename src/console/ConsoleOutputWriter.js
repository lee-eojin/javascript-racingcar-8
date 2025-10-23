import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../constants.js';

class ConsoleOutputWriter {
  printResultMessage() {
    Console.print(MESSAGES.RESULT_MESSAGE);
  }

  printRoundResult(cars) {
    cars.forEach((car) => {
      const positionString = '-'.repeat(car.getPosition());
      Console.print(`${car.getName()} : ${positionString}`);
    });
    Console.print('');
  }

  printWinners(winners) {
    const winnerNames = winners.map((car) => car.getName()).join(', ');
    Console.print(`최종 우승자 : ${winnerNames}`);
  }
}

export default ConsoleOutputWriter;
