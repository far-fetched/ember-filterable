import Component from '@ember/component';
import Filterable from '../mixins/filterable';
import { computed } from '@ember/object';
import FilterPanelBuilder from "../models/filter-panel-builder";

export default Component.extend(Filterable, {
  init() {
    this._super(...arguments);
    this.currentFilter = undefined;
  },

  didReceiveAttrs() {
    this._super(...arguments);
    /*if (this.filters) {
      this.filterPanel.createSingleton({
        filters: this.filters,
        callback: this.executeFilters.bind(this),
        filterStrategy: 'atLeastOneFilterTrue'
      });
    }*/
    if (this.data) {
      this.filterPanel.updateData(this.data);
    }
  },

  filterPanel: computed('filters', function() {
    return FilterPanelBuilder
      .withFilters(this.filters)
      .withOnFilter(this.get('onFilter'))
      .setStrategy('atLeastOneFilterTrue')
      .build();
  }),

  inputColumnSize: computed('currentFilter', function() {
    return (12 / this.currentFilter.inputs.length);
  }),

  actions: {
    onClickButtonAddFilter(filter) {
      filter.addValue();
    },
    onRemoveFilter(filter, value) {
      filter.removeValue(value);
    }
  }
});
