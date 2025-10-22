# javascript-racingcar-precourse

## 프로젝트 구조

```
src/
  ├── entity/
  │   └── Car.js
  ├── controller/
  │   ├── RaceController.js
  │   └── CarValidator.js
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
- 이동 거리를 문자열로 반환 (-)

### CarValidator
- 자동차 이름은 5자 이하만 가능
- 5자 초과 시 [ERROR] 예외 발생

### RaceController
- 자동차 이름 목록으로 Car 객체들 생성
- 주어진 횟수만큼 모든 자동차 전진/정지 판단 (Random 0~9, 4 이상 시 전진)
- 최다 전진 자동차 탐색 (공동 우승 가능)

### ConsoleInputReader
- 자동차 이름 입력 (쉼표 구분)
- 시도 횟수 입력

### ConsoleOutputWriter
- 각 라운드 결과 출력 (이름 : ---)
- 최종 우승자 출력 (쉼표 구분)

### App
- 전체 게임 흐름 제어
