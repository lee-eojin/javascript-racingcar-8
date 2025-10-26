import { MAX_NAME_LENGTH, MESSAGES } from '../constants.js';

class NameValidator {
  static validateName(name) {
    if (name.length === 0) {
      throw new Error(MESSAGES.ERROR_NAME_EMPTY);
    }
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(MESSAGES.ERROR_NAME_LENGTH);
    }
  }

  static validateNames(names) {
    names.forEach((name) => NameValidator.validateName(name));
  }
}

export default NameValidator;
