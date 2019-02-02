import { defineError } from 'ember-exex/error';

const NoSpecifiedStrategyError = defineError({
  name: 'FilterInterpreter',
  message: "You have to specify filter strategy"
});

export { NoSpecifiedStrategyError };
