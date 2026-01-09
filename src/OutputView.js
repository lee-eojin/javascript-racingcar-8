import { Console } from "@woowacourse/mission-utils";

class OutputView {
  printStart() {
    Console.print("실행결과");
  }

  printRacing(cars) {
    cars.forEach(car => Console.print(car.getResult()));
  }

  printNewLine() {
    Console.print(""); // 빈 문자열 = 빈 줄
  }

  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners}`);
  }
}

export default OutputView;
