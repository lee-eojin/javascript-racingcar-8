import ConsoleOutputWriter from '../src/console/ConsoleOutputWriter.js';
import Car from '../src/entities/Car.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { MESSAGES } from '../src/constants.js';

describe('ConsoleOutputWriter', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(MissionUtils.Console, 'print');
    consoleSpy.mockClear();
  });

  describe('printResultMessage', () => {
    it('실행 결과 메시지 출력', () => {
      const writer = new ConsoleOutputWriter();

      writer.printResultMessage();

      expect(consoleSpy).toHaveBeenCalledWith(MESSAGES.RESULT_MESSAGE);
    });
  });

  describe('printRoundResult', () => {
    it('자동차 이름과 위치 출력', () => {
      const writer = new ConsoleOutputWriter();
      const car1 = new Car('pobi');
      const car2 = new Car('eojin');
      car1.move();
      car1.move();
      car2.move();

      writer.printRoundResult([car1, car2]);

      expect(consoleSpy).toHaveBeenCalledWith('pobi : --');
      expect(consoleSpy).toHaveBeenCalledWith('eojin : -');
      expect(consoleSpy).toHaveBeenCalledWith('');
    });

    it('위치가 0일 때 빈 문자열 출력', () => {
      const writer = new ConsoleOutputWriter();
      const car = new Car('pobi');

      writer.printRoundResult([car]);

      expect(consoleSpy).toHaveBeenCalledWith('pobi : ');
    });
  });

  describe('printWinners', () => {
    it('단독 우승자 출력', () => {
      const writer = new ConsoleOutputWriter();
      const car = new Car('pobi');

      writer.printWinners([car]);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('pobi'));
    });

    it('공동 우승자 쉼표로 구분하여 출력', () => {
      const writer = new ConsoleOutputWriter();
      const car1 = new Car('pobi');
      const car2 = new Car('eojin');
      const car3 = new Car('lej');

      writer.printWinners([car1, car2, car3]);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('pobi'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('eojin'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('lej'));
    });
  });
});
