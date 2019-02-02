import EmberObject from '@ember/object';

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
      throw new Error('erro4');
    }
  },

  setStrategy(strategyName) {
    this.strategyFn = this.strategyProducer.produce(strategyName);
  }
});
