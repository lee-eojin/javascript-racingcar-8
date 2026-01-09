import { Console } from "@woowacourse/mission-utils";

// OutputView: 출력만 담당
// 메서드 이름은 print로 시작하는 게 컨벤션
// 포맷팅(repeat, join, toFixed 등)은 여기서 해도 됨
class OutputView {
  // 게임 시작 메시지 출력
  printStart() {
    // Console.print(): 콘솔에 한 줄 출력
    Console.print("실행결과");
  }

  // 한 라운드 결과 출력 (모든 자동차 현재 위치)
  printRound(cars) {
    // forEach: 배열 순회하면서 각 요소에 작업 수행
    // 반환값 없음. 단순 반복 작업용
    cars.forEach((car) => {
      // repeat(n): 문자열을 n번 반복
      // "-".repeat(3) -> "---"
      // position이 0이면 빈 문자열 반환
      const progress = "-".repeat(car.position);
      // 템플릿 리터럴: 백틱(`)으로 감싸고 ${변수}로 값 삽입
      // 문자열 연결보다 가독성 좋음
      Console.print(`${car.name} : ${progress}`);
    });
  }

  // 빈 줄 출력 (출력 사이 간격 줄 때 사용)
  printNewLine() {
    Console.print(""); // 빈 문자열 출력 = 빈 줄
  }

  // 최종 우승자 출력
  // winners: 이미 App에서 join()으로 문자열로 만들어서 넘어옴
  // "pobi,woni" 형태
  printWinners(winners) {
    Console.print(`최종 우승자 : ${winners}`);
  }
}

export default OutputView;
