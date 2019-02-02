import FilterPanel from '../models/filter-panel';
import EmberObject from '@ember/object';
import { isArray } from '@ember/array';
import { isBlank } from '@ember/utils';

export default EmberObject.reopenClass({
  REQUIRED_PROPS: [{
    name: 'filters',
    type: isArray
  }, {
    name: 'onFilter',
    type: 'function'
  }],

  validate() {
    this.REQUIRED_PROPS.forEach(prop => {
      this.validatePresence(prop);
      this.validateType(prop);
    });
  },

  validatePresence(prop) {
    if (isBlank(this[prop.name])) {
      throw new Error('erro1');
    }
  },

  validateType(prop) {
    if (typeof prop.type === 'string' ) {
      if (typeof this[prop.name] !== prop.type) {
        throw new Error('erro2');
      }
    } else {
      if (!(prop.type(this[prop.name]))) {
        throw new Error('erro3');
      }
    }
  },

  withFilters(filters) {
    this.filters = filters;
    return this;
  },

  withOnFilter(callback) {
    this.onFilter = callback;
    return this;
  },

  setStrategy(strategyName) {
    this.strategyName = strategyName;
    return this;
  },

  cleanClass() {
    this.filters = null;
    this.onFilter = null;
    this.strategyName = null;
  },

  build() {
    this.validate();
    let filterPanel = FilterPanel.create({
      filters: this.filters,
      onFilter: this.onFilter,
      strategyName: this.strategyName
    });
    this.cleanClass();
    return filterPanel;
  }
});
