import NameValidator from '../src/entities/NameValidator.js';

describe('NameValidator', () => {
  describe('validateName', () => {
    it.each([
      ['pobi'],
      ['eojin'],
      ['a'],
      ['12345'],
    ])('정상 이름 "%s"', (name) => {
      expect(() => NameValidator.validateName(name)).not.toThrow();
    });

    it.each([
      ['', '[ERROR] 자동차 이름은 빈 값일 수 없습니다.'],
      ['abcdef', '[ERROR] 자동차 이름은 5자 이하만 가능합니다.'],
      ['toolong', '[ERROR] 자동차 이름은 5자 이하만 가능합니다.'],
    ])('잘못된 이름 "%s"', (name, errorMessage) => {
      expect(() => NameValidator.validateName(name)).toThrow(errorMessage);
    });
  });

  describe('validateNames', () => {
    it('모든 이름이 정상일 때', () => {
      expect(() => NameValidator.validateNames(['pobi', 'eojin', 'lej'])).not.toThrow();
    });

    it('하나라도 잘못된 이름이 있을 때', () => {
      expect(() => NameValidator.validateNames(['pobi', 'toolong', 'eojin'])).toThrow('[ERROR]');
    });
  });
});
