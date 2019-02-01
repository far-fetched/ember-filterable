import Filter from './filter';
import EmberObject from '@ember/object';
import FilterStrategyFactory from './filter-strategy-factory';
import FilterInterpreter from './filter-interpreter';

export default EmberObject.extend({
  init({ filters, strategyName }) {
    this._super(...arguments);
    const availableFilters = filters.map(filter => {
      filter.notifyFiltersChange = this.executeFilters.bind(this);
      return Filter.create(filter);
    });

    this.set('availableFilters', availableFilters);
    this.filterInterpreter = FilterInterpreter.create({
      strategyProducer: FilterStrategyFactory
    });
    if (strategyName) {
      this.setFilterStrategy(strategyName);
    }
  },

  executeFilters() {
    let filtered = this.get('data');
    if (this.isAnyFilterChosen()) {
      filtered = this.simpleFilterByKey(filtered);
    }
    this.onFilter(filtered);
  },

  simpleFilterByKey(data) {
    return data.filter(item => {
      const map = this.createMapOfFilteredByKey(item);
      return this.filterInterpreter.isFiltered(map);
    });
  },

  createMapOfFilteredByKey(item) {
    const filters = this.get('availableFilters');
    return filters.reduce((acc, filter) => {
      acc[filter.get('key')] = filter.getItemState(item);
      return acc;
    }, {});
  },

  setFilterStrategy(filterStrategyName) {
    this.filterInterpreter.setStrategy(filterStrategyName);
    return this;
  },

  updateData(data) {
    this.set('data', data);
    this.executeFilters();
  },

  isAnyFilterChosen() {
    const filters = this.get('availableFilters');
    for (let filter of filters) {
      if (filter.chosenValues.length > 0) {
        return true;
      }
    }
    return false;
  }
});




