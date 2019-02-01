import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.valueValidator = ValueValidator.create();
    this.inputsValidator = InputsValidator.create();

    this.valueValidator.setNextValidator(this.inputsValidator);
  },

  isValid() {
    try {
      this.valueValidator.exec(this.filter);
      return true;
    }
    catch(e) {
      return false;
    }
  }
});

let BaseValidator = EmberObject.extend({
  exec(filter) {
    if (this.next) {
      this.next.exec(filter);
    }
  },

  setNextValidator(validator) {
    this.next = validator;
  }
});

let ValueValidator = BaseValidator.extend({
  exec(filter) {
    this.isValueUniq(filter);
    this._super(...arguments);
  },

  isValueUniq(filter) {
    const valueToAdd = filter.inputs.mapBy('activeValue').join('');
    if (filter.chosenValues.indexOf(valueToAdd) > -1) {
      throw new Error();
    }
  }
});

let InputsValidator = BaseValidator.extend({
  exec(filter) {
    this.areInputsValid(filter.inputs);
    this._super(...arguments);
  },

  areInputsValid(inputs) {
    inputs.forEach(input => this.isInputValid(input));
  },

  isInputValid(input) {
    if (isBlank(input.activeValue)) {
      throw new Error();
    }
  }
});
