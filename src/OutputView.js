import { Console } from "@woowacourse/mission-utils";

class OutputView {
  printStart() {
    Console.print("\n실행 결과");
  }
  printRound(cars) {
    cars.forEach(car => Console.print(car.getResult()));
    Console.print("");
  }
  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }
}

export default OutputView;