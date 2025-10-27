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
    NameValidator.validateDuplicates(names);
  }

  static validateDuplicates(names) {
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
      throw new Error(MESSAGES.ERROR_NAME_DUPLICATE);
    }
  }
}

export default NameValidator;
