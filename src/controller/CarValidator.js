const MAX_NAME_LENGTH = 5;

class CarValidator {
  validate(name) {
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(`[ERROR] 자동차 이름은 ${MAX_NAME_LENGTH}자 이하만 가능합니다.`);
    }
  }

  validateAll(names) {
    names.forEach((name) => this.validate(name));
  }
}

export default CarValidator;
