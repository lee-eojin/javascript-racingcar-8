// 우테코 전용 라이브러리에서 Console, Random 가져옴
// Console: 입출력 담당 (readLineAsync, print)
// Random: 랜덤 숫자 생성 (pickNumberInRange, pickUniqueNumbersInRange, shuffle)
import { Console, Random } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  // run()은 프로그램 진입점. 반드시 async여야 함 (내부에서 await 사용하니까)
  async run() {
    // View 객체 생성 - 입력/출력 분리하면 역할이 명확해짐
    const inputView = new InputView();
    const outputView = new OutputView();

    // #readCarNames: 입력받고 + 검증까지 한번에 처리하는 래퍼 메서드
    // await 필수 - readLineAsync가 Promise 반환하니까
    const carNames = await this.#readCarNames(inputView);
    const tryCount = await this.#readTryCount(inputView);

    // 자동차 객체 배열 생성
    // Car 클래스 안 만들고 객체 리터럴로 처리 (간단한 구조면 이게 더 빠름)
    // map(): 배열의 각 요소를 변환해서 새 배열 반환
    // ["pobi", "woni"] -> [{ name: "pobi", position: 0 }, { name: "woni", position: 0 }]
    const cars = carNames.map((name) => ({ name, position: 0 }));

    outputView.printStart();

    // for문: 횟수가 정해진 반복에 사용
    // while(true)는 언제 끝날지 모를 때 (다리 건너기, 메뉴 루프 등)
    for (let i = 0; i < tryCount; i++) {
      // forEach: 배열 순회. 반환값 없음. 단순 반복 작업에 적합
      // 각 자동차마다 전진 시도
      cars.forEach((car) => this.#tryMoveCar(car));
      outputView.printRound(cars);
    }
    // 게임 끝나면 우승자 찾아서 출력
    const winners = this.#findWinners(cars);
    outputView.printWinners(winners);
  }

  // 우승자 찾기 (최대 position 가진 자동차들)
  // async 안 붙임 - 사용자 입력 안 받고 계산만 하니까
  #findWinners(cars) {
    // Math.max(): 최댓값 찾기
    // 스프레드(...) 필수! Math.max([1,2,3])은 NaN, Math.max(1,2,3)은 3
    // map()으로 position만 뽑아서 배열 만들고, 스프레드로 펼침
    const maxPosition = Math.max(...cars.map((car) => car.position));

    // 메서드 체이닝: filter -> map -> join 순서로 처리
    return cars
      // filter(): 조건 만족하는 요소만 남김 (새 배열 반환)
      .filter((car) => car.position === maxPosition)
      // map(): 각 요소 변환 (새 배열 반환). 여기선 name만 추출
      .map((car) => car.name)
      // join(): 배열을 문자열로 합침. ["pobi", "woni"] -> "pobi,woni"
      .join(",");
  }

  // 자동차 전진 시도
  // car 객체는 참조로 전달됨 -> position++ 하면 원본도 바뀜
  #tryMoveCar(car) {
    // Random.pickNumberInRange(시작, 끝): 범위 내 정수 1개 반환
    // 시작, 끝 모두 포함! (0~9면 0,1,2,3,4,5,6,7,8,9 중 하나)
    const randomNumber = Random.pickNumberInRange(0, 9);

    // 4 이상이면 전진 (60% 확률)
    if (randomNumber >= 4) {
      car.position++;
    }
  }

  // 자동차 이름 입력 + 검증 래퍼 메서드
  // async 붙임 - 내부에서 await 쓰니까
  async #readCarNames(inputView) {
    const input = await inputView.readCarNames();
    // split(): 문자열을 구분자로 쪼개서 배열로. "a,b,c" -> ["a", "b", "c"]
    // map() + trim(): 각 요소 앞뒤 공백 제거. " pobi " -> "pobi"
    const names = input.split(",").map((s) => s.trim());
    // 검증 실패하면 에러 던지고 앱 종료됨
    this.#validateCarNames(names);
    return names;
  }

  // 자동차 이름 검증
  // async 안 붙임 - 입력 안 받고 동기적 검증만 하니까
  #validateCarNames(names) {
    // some(): 하나라도 조건 만족하면 true 반환
    // every()는 전부 만족해야 true
    // 5글자 초과하는 이름이 하나라도 있으면 에러
    if (names.some((name) => name.length > 5)) {
      // 에러 메시지는 반드시 "[ERROR]"로 시작해야 함 (우테코 규칙)
      throw new Error("[ERROR] 이름은 5글자 이하여야 합니다.");
    }
  }

  // 시도 횟수 입력 + 검증 래퍼 메서드
  async #readTryCount(inputView) {
    const count = await inputView.readTryCount();
    this.#validateTryCount(count);
    return count;
  }

  // 시도 횟수 검증
  #validateTryCount(count) {
    // Number.isNaN(): NaN인지 체크. 숫자 검증할 때 항상 먼저 해야 함
    // isNaN()과 다름! isNaN("abc")는 true, Number.isNaN("abc")는 false
    // Number("abc")가 NaN이므로 Number.isNaN(Number("abc"))로 체크
    if (Number.isNaN(count)) {
      throw new Error("[ERROR] 숫자를 입력해주세요.");
    }
  }
}

export default App;
