import Mixin from '@ember/object/mixin';
import FilterPanelBuilder from '../models/filter-panel-builder';
import { defineProperty } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const createSingleton = function({ filters, callback, filterStrategy }) {
  if (!this.filterPanel._instance) {
    const filterPanel = FilterPanelBuilder
      .withFilters(filters)
      .withCallback(callback)
      .setStrategy(filterStrategy)
      .build();
    this.filterPanel._instance = filterPanel;
  }
};

const updateData = function(data) {
  this.filterPanel._instance.updateData(data);
};

const exposeFilterPanelFacade = function() {
  let facade = {
    createSingleton: createSingleton.bind(this),
    updateData: updateData.bind(this)
  };
  defineProperty(facade, 'availableFilters', readOnly('_instance.availableFilters'));
  return facade;
};

export default Mixin.create({
  init() {
    this._super(...arguments);
    /*this.filterPanel = exposeFilterPanelFacade.call(this);*/
  }
});
