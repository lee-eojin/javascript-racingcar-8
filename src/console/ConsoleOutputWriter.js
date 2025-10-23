import { Console } from '@woowacourse/mission-utils';

class ConsoleOutputWriter {
  printRoundResult(cars) {
    cars.forEach((car) => {
      Console.print(`${car.getName()} : ${car.getPositionString()}`);
    });
    Console.print('');
  }

  printWinners(winners) {
    const winnerNames = winners.map((car) => car.getName()).join(', ');
    Console.print(`최종 우승자 : ${winnerNames}`);
  }

  printError(message) {
    Console.print(message);
  }
}

export default ConsoleOutputWriter;
