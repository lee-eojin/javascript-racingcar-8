import ConsoleInputReader from '../src/console/ConsoleInputReader.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { MESSAGES } from '../src/constants.js';

const mockReadLine = (input) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockResolvedValue(input);
};

describe('ConsoleInputReader', () => {
  describe('readNames', () => {
    it.each([
      ['pobi,eojin', ['pobi', 'eojin']],
      ['pobi, eojin, lej', ['pobi', 'eojin', 'lej']],
      ['pobi,  eojin  ', ['pobi', 'eojin']],
    ])('이름 입력 파싱', async (input, expected) => {
      mockReadLine(input);
      const reader = new ConsoleInputReader();

      const result = await reader.readNames();

      expect(result).toEqual(expected);
    });
  });

  describe('readRoundCount', () => {
    it.each([
      ['5', 5],
      ['1', 1],
      ['10', 10],
    ])('정상 횟수 반환', async (input, expected) => {
      mockReadLine(input);
      const reader = new ConsoleInputReader();

      const result = await reader.readRoundCount();

      expect(result).toBe(expected);
    });

    it.each([
      ['0'],
      ['-1'],
      ['abc'],
      ['1.5'],
    ])('잘못된 횟수 에러 발생', async (input) => {
      mockReadLine(input);
      const reader = new ConsoleInputReader();

      await expect(reader.readRoundCount()).rejects.toThrow(MESSAGES.ERROR_ROUND_COUNT);
    });
  });
});
