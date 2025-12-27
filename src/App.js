import { Console } from "@woowacourse/mission-utils";
import Car from "./Car";

class App {
  async run() {
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    const playerNames = input.split(",");

    for (const name of playerNames) {
      if (name.length > 5) {
        throw new Error("[ERROR] 이름은 5자 이하여야 합니다.");
      }
    }

    const countInput = await Console.readLineAsync(
      "시도할 횟수는 몇 회인가요?"
    );
    const countNumber = Number(countInput);
    if (Number.isNaN(countNumber) || countNumber < 1) {
      throw new Error("[ERROR] 유효한 횟수를 입력해주세요.");
    }
    const cars = playerNames.map((name) => new Car(name));
  
    Console.print("\n실행 결과");

    for (let i = 0; i < countNumber; i++) {
      cars.forEach(car => car.tryMove());
      cars.forEach(car => Console.print(car.getResult()));
      Console.print("");
    }
    
    const maxPosition = Math.max(...cars.map(car => car.getPosition()));

    const winners = cars
    .filter(car => car.getPosition() === maxPosition)
    .map(car => car.getName());

    Console.print(`최종 우승자 : ${winners.join(", ")}`);
  }
}

export default App;
