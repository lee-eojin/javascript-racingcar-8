// 우테코 라이브러리에서 Console 가져옴
// Console.readLineAsync(): 사용자 입력 받음 (Promise 반환)
// Console.print(): 콘솔에 출력
import { Console } from "@woowacourse/mission-utils";

// InputView: 입력만 담당. 검증은 여기서 하면 안 됨!
// 왜? 역할 분리. InputView는 입력만, 검증은 App에서.
class InputView {
  // 자동차 이름 입력받기
  // async 붙임 - readLineAsync가 Promise 반환하니까 await 필요
  async readCarNames() {
    // readLineAsync(메시지): 메시지 출력하고 입력 대기
    // 반환값: 사용자가 입력한 문자열 그대로
    const input = await Console.readLineAsync(
      "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)"
    );
    // 여기서 split 안 함 - 그냥 원본 문자열 반환
    // 파싱(split, trim)은 App에서 해도 되고 여기서 해도 됨
    // 근데 검증은 무조건 App에서!
    return input;
  }

  // 시도 횟수 입력받기
  async readTryCount() {
    const input = await Console.readLineAsync("시도할 횟수는 몇 회인가요?");
    // Number(): 문자열을 숫자로 변환
    // "5" -> 5, "abc" -> NaN, "" -> 0, "3.14" -> 3.14
    // parseInt()와 차이: parseInt("3abc") -> 3, Number("3abc") -> NaN
    // 간단한 변환은 InputView에서 해도 됨 (검증 아니니까)
    return Number(input);
  }
}

export default InputView;
