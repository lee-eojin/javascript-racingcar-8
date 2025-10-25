import { MAX_NAME_LENGTH, MESSAGES } from '../constants.js';

class NameValidator {
  validateName(name) {
    if (name.length === 0) {
      throw new Error(MESSAGES.ERROR_NAME_EMPTY);
    }
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(MESSAGES.ERROR_NAME_LENGTH);
    }
  }

  validateNames(names) {
    names.forEach((name) => this.validateName(name));
  }
}

export default NameValidator;
