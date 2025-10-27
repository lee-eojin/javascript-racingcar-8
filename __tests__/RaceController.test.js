import RaceController from '../src/controllers/RaceController.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

describe('RaceController', () => {
  describe('initCars', () => {
    test('자동차 배열 생성', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);

      const cars = controller.getCars();
      expect(cars).toHaveLength(2);
      expect(cars[0].getName()).toBe('pobi');
      expect(cars[1].getName()).toBe('eojin');
    });

    test('잘못된 이름으로 에러 발생', () => {
      const controller = new RaceController();
      expect(() => controller.initCars(['toolong'])).toThrow('[ERROR]');
    });
  });

  describe('getCars', () => {
    test('자동차 배열의 복사본 반환', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);

      const cars = controller.getCars();
      cars.push('새로운 요소');

      expect(controller.getCars()).toHaveLength(2);
    });
  });

  describe('playGame', () => {
    test('랜덤 값에 따라 자동차 전진', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);
      mockRandoms([4, 3]); // pobi 턱걸이, eojin 못감

      controller.playGame(1, () => {});

      const cars = controller.getCars();
      expect(cars[0].getPosition()).toBe(1);
      expect(cars[1].getPosition()).toBe(0);
    });

    test('여러 라운드 진행', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);
      mockRandoms([4, 4, 5, 3]); 

      controller.playGame(2, () => {});

      const cars = controller.getCars();
      expect(cars[0].getPosition()).toBe(2);
      expect(cars[1].getPosition()).toBe(1);
    });

    test('각 라운드마다 콜백 호출', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);
      mockRandoms([4, 4, 4, 4]);
      const callback = jest.fn();

      controller.playGame(2, callback);

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('getWinners', () => {
    test('단독 우승자 반환', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin']);
      mockRandoms([4, 3]);
      controller.playGame(1, () => {});

      const winners = controller.getWinners();

      expect(winners).toHaveLength(1);
      expect(winners[0].getName()).toBe('pobi');
    });

    test('공동 우승자 반환', () => {
      const controller = new RaceController();
      controller.initCars(['pobi', 'eojin', 'lej']);
      mockRandoms([4, 4, 3]);
      controller.playGame(1, () => {});

      const winners = controller.getWinners();

      expect(winners).toHaveLength(2);
      expect(winners[0].getName()).toBe('pobi');
      expect(winners[1].getName()).toBe('eojin');
    });
  });
});
