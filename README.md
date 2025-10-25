# javascript-racingcar-precourse

초간단 자동차 경주 게임

## 프로젝트 구조

```
src/
  ├── entities/
  │   ├── Car.js
  │   └── NameValidator.js
  ├── controllers/
  │   └── RaceController.js
  ├── console/
  │   ├── ConsoleInputReader.js
  │   └── ConsoleOutputWriter.js
  ├── constants.js
  ├── App.js
  └── index.js
```

## 기능 목록

### Car
- 자동차 이름을 가짐
- 이동 거리는 0부터 시작
- 전진 시 이동 거리가 1씩 증가

### NameValidator
- 이름은 빈 값일 수 없음
- 빈 값일 경우 [ERROR] 예외 발생
- 이름은 5자 이하만 가능
- 5자 초과 시 [ERROR] 예외 발생

### RaceController
- 자동차 이름 목록으로 Car 객체들 생성 (NameValidator로 검증)
- 게임 진행: 주어진 횟수만큼 라운드 실행 및 콜백 호출
- 각 라운드마다 모든 자동차 전진/정지 판단 (Random 0~9, 4 이상 시 전진)
- 최다 전진 자동차 탐색 (공동 우승 가능)

### ConsoleInputReader
- 이름 입력 (쉼표 구분)
- 시도 횟수 입력
- 시도 횟수는 1 이상의 정수여야 함
- 유효하지 않은 시도 횟수일 경우 [ERROR] 예외 발생

### ConsoleOutputWriter
- 실행 결과 헤더 출력
- 각 라운드 결과 출력 (이름 : ---, position을 - 문자열로 변환)
- 최종 우승자 출력 (쉼표 구분)

### App
- 전체 게임 흐름 제어

## 처리 로직

프로그램 실행의 시작점인 index.js에서 App 인스턴스를 생성하고 run()을 호출한다. App.run()은 Console.readLineAsync()를 통해 사용자로부터 자동차 이름과 시도 횟수를 입력받는다.

App은 ConsoleInputReader를 통해 입력을 받는다. readNames()는 쉼표로 구분된 이름 문자열을 split(',')로 분리하고 각 이름의 앞뒤 공백을 trim()으로 제거하여 이름 배열을 반환한다. readRoundCount()는 입력받은 문자열을 Number()로 변환한 후, 1 이상의 정수인지 검증하고 시도 횟수를 반환한다. 유효하지 않은 값이면 ERROR 메시지와 함께 에러를 발생시킨다.

입력받은 이름 배열은 RaceController의 initCars(names)로 전달된다. initCars()는 먼저 NameValidator 인스턴스를 생성하여 validateNames(names)를 호출한다. NameValidator는 각 이름을 순회하며 빈 값인지, 길이가 5자를 초과하는지 검증하고, 유효하지 않으면 ERROR 메시지와 함께 에러를 발생시킨다.

검증이 완료되면 이름 배열을 map()으로 순회하며 각 이름으로 Car 객체를 생성한다. Car는 생성 시점에 name을 private 필드에 저장하고 position을 0으로 초기화한다.

App은 ConsoleOutputWriter의 printResultMessage()를 호출하여 실행 결과 헤더를 출력한 후, RaceController의 playGame(roundCount, callback)을 호출하여 게임을 시작한다.

playGame()은 주어진 횟수만큼 반복하며 각 라운드마다 playRound()를 호출한다. playRound()는 모든 자동차를 순회하며 moveCarIfPossible(car)를 호출한다. moveCarIfPossible()은 checkMoveCondition()을 통해 전진 여부를 판단한다.

checkMoveCondition()은 Random.pickNumberInRange(0, 9)로 무작위 값을 생성하고, 이 값이 4 이상이면 true를 반환한다. true가 반환되면 car.move()를 호출하여 position을 1 증가시킨다.

각 라운드가 끝날 때마다 onRoundComplete 콜백이 호출되어 getCars()로 현재 자동차 배열의 복사본을 전달한다. App은 이 콜백에서 ConsoleOutputWriter의 printRoundResult(cars)를 호출한다.

printRoundResult()는 각 자동차를 순회하며 getName()으로 이름을 가져오고 getPosition()으로 위치를 가져온다. 위치 값을 repeat()으로 변환하여 position 개수만큼 - 문자를 반복한 문자열을 만들고, 이름과 함께 출력한다. 모든 자동차 출력 후 빈 줄을 추가한다.

모든 라운드가 종료되면 RaceController의 getWinners()를 호출하여 우승자를 찾는다. getWinners()는 먼저 calculateMaxPosition()으로 모든 자동차의 position 중 최댓값을 구한다. 그 후 filter()로 position이 최댓값과 같은 자동차들만 추출하여 반환한다.

우승자 배열은 ConsoleOutputWriter의 printWinners(winners)로 전달된다. printWinners()는 우승자 배열을 map()으로 순회하며 각 자동차의 이름을 추출하고, join(', ')으로 쉼표와 공백으로 연결하여 최종 우승자 문자열을 출력한다.
