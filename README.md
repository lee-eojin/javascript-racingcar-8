# javascript-racingcar-precourse

## 프로젝트 구조

```
src/
  ├── domain/
  │   └── Car.js
  ├── service/
  │   ├── CarNameValidator.js
  │   └── RaceController.js
  ├── view/
  │   ├── ConsoleInputView.js
  │   └── ConsoleOutputView.js
  └── App.js
```

## 기능 목록

### Car
- 각 자동차가 이름을 가짐
- 자동차의 이동 거리는 0부터 시작
- 0에서 9 사이의 무작위 값을 구함 (Random.pickNumberInRange(0, 9))
- 그 무작위 값이 4 이상일 경우 전진
- 전진할 때마다 이동 거리가 1씩 증가
- 이동 거리만큼 -로 표현

### CarNameValidator
- 자동차 이름은 5자 이하만 가능
- 5자를 초과할 경우 [ERROR]로 시작하는 메시지와 함께 예외 발생 -> 애플리케이션 종료

### RaceController
- 주어진 이름 목록으로 여러 대의 자동차를 생성
- 주어진 횟수만큼 모든 자동차는 전진 또는 멈춤
- 게임 종료 후 가장 많이 전진한 자동차를 탐색
- 공동 우승 존재 가능

### ConsoleInputView
- 사용자로부터 자동차 이름을 입력받음 (Console.readLineAsync)
- 자동차 이름은 쉼표를 기준으로 구분
- 사용자로부터 시도할 횟수를 입력받음 (Console.readLineAsync)

### ConsoleOutputView
- 각 라운드마다 자동차 이름과 이동 거리를 함께 출력
- 게임 종료 후 우승자를 출력
- 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분

### App
- 전체 게임 흐름을 제어
