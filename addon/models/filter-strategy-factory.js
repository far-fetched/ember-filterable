import EmberObject from '@ember/object';
import Filter from './filter';

export default EmberObject.reopenClass({
  produce(filterStrategyName) {
    this.filterStrategies = {
      atLeastOneFilterTrue: this.atLeastOneFilterTrue,
      allFiltersTrue: this.allFiltersTrue
    };

    return this.filterStrategies[filterStrategyName];
  },

  atLeastOneFilterTrue(filterMap) {
    for (let key of Object.keys(filterMap)) {
      if (filterMap[key] === Filter.ITEM_STATES.FILTERED) {
        return true;
      }
    }
    return false;
  },

  allFiltersTrue(filterMap) {
    for (let key of Object.keys(filterMap)) {
      if (filterMap[key] === Filter.ITEM_STATES.REJECTED) {
        return false;
      }
    }
    return true;
  }
});
