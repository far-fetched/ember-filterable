import EmberObject from '@ember/object';
import { NoSpecifiedStrategyError } from '../errors/filter-interpreter';

export default EmberObject.extend({
  init() {
    this._super(...arguments);
  },

  isFiltered(map) {
    this.validateStrategy();
    return this.strategyFn(map);
  },

  validateStrategy() {
    if (!this.strategyFn) {
      throw new NoSpecifiedStrategyError();
    }
  },

  setStrategy(strategyName) {
    this.strategyFn = this.strategyProducer.produce(strategyName);
  }
});
