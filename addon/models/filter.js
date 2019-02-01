import EmberObject from '@ember/object';
import { isArray, A } from '@ember/array';
import FilterValidator from './filter-validator';

let Filter = EmberObject.reopenClass({
  REQUIRED_ATTRS: ['keyLabel', 'key'],
  ITEM_STATES: {
    FILTERED: 'filtered',
    REJECTED: 'rejected',
    EMPTY_FILTER: 'emptyFilter'
  }
});

export default Filter.extend({
  init() {
    this._super(...arguments);
    this.validateExistanceOfRequiredAttrs(...arguments);
    this.createAtLeastOneTextInput();
    this.fillPrompted();
    this.chosenValues = A([]);
    this.validator = FilterValidator.create({ filter: this });
  },

  fillPrompted() {
    this.inputs.forEach(input => {
      if (input.predefinedPrompts) {
        input.prompts = [];
        input.prompts.push(...input.predefinedPrompts);
      }
    });
  },

  createAtLeastOneTextInput() {
    if (!isArray(this.inputs)) {
      this.inputs = [{}];
    }
  },

  validateExistanceOfRequiredAttrs(providedObj) {
    Filter.REQUIRED_ATTRS.forEach(requiredAttr => {
      if (!providedObj[requiredAttr]) {
        throw new Error(`Attribute ${requiredAttr} can't be empty`);
      }
    });
  },

  addValue(...values) {
    if (values) {
      values.forEach ((value, ix) => this.inputs[ix].activeValue = value);
    }
    if (this.isValid()) {
      const valueToAdd = this.inputs.mapBy('activeValue').join('');
      this.addChosenValues(valueToAdd);
    }
  },

  addChosenValues(valueToAdd) {
    this.get('chosenValues').pushObject(valueToAdd);
    this.notifyChanges();
  },

  getItemState(item) {
    if (this.get('chosenValues').length === 0) {
      return Filter.ITEM_STATES.EMPTY_FILTER;
    }
    if (this.comparator(this.chosenValues, String(item[this.get('key')]))) {
      return Filter.ITEM_STATES.FILTERED;
    } else {
      return Filter.ITEM_STATES.REJECTED;
    }
  },

  comparator(expected, actual) {
    return (expected.indexOf(actual) > -1);
  },

  removeValue(value) {
    this.get('chosenValues').removeObject(value);
    this.notifyChanges();
  },

  notifyChanges() {
    if (typeof this.notifyFiltersChange === 'function') {
      this.notifyFiltersChange();
    }
  },

  isValid() {
    return this.validator.isValid();
  }
});
