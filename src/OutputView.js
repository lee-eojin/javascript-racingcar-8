import { Console } from "@woowacourse/mission-utils";

class OutputView {
  printStart() {
    Console.print("실행결과");
  }

  printRound(cars) {
    cars.forEach((car) => {
      const progress = "-".repeat(car.position);
      Console.print(`${car.name} : ${progress}`);
    });
  }

  printNewLine() {
    Console.print(""); // 빈 문자열 = 빈 줄
  }

  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners}`);
  }
}

export default OutputView;
