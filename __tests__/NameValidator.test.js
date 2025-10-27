import NameValidator from '../src/entities/NameValidator.js';
import { MESSAGES } from '../src/constants.js';

describe('NameValidator', () => {
  describe('validateName', () => {
    it.each([
      ['pobi'],
      ['eojin'],
      ['a'],
      ['12345'],
    ])('정상 이름 통과', (name) => {
      expect(() => NameValidator.validateName(name)).not.toThrow();
    });

    it.each([
      ['', MESSAGES.ERROR_NAME_EMPTY],
      ['abcdef', MESSAGES.ERROR_NAME_LENGTH],
      ['toolong', MESSAGES.ERROR_NAME_LENGTH],
    ])('잘못된 이름 에러 발생', (name, errorMessage) => {
      expect(() => NameValidator.validateName(name)).toThrow(errorMessage);
    });
  });

  describe('validateNames', () => {
    it('모든 이름이 정상', () => {
      expect(() => NameValidator.validateNames(['pobi', 'eojin', 'lej'])).not.toThrow();
    });

    it('하나라도 잘못된 이름이 있을 때', () => {
      expect(() => NameValidator.validateNames(['pobi', 'toolong', 'eojin'])).toThrow('[ERROR]');
    });

    it('중복된 이름이 있을 때', () => {
      expect(() => NameValidator.validateNames(['pobi', 'eojin', 'pobi'])).toThrow(MESSAGES.ERROR_NAME_DUPLICATE);
    });
  });
});
