import { MAX_NAME_LENGTH, MESSAGES } from '../constants.js';

class CarValidator {
  validate(name) {
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(MESSAGES.ERROR_CAR_NAME_LENGTH);
    }
  }

  validateAll(names) {
    names.forEach((carName) => this.validate(carName));
  }
}

export default CarValidator;
