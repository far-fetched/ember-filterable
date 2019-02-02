import { defineError } from 'ember-exex/error';

const PropertyPresenceError = defineError({
  name: 'FilterPanelBuilder',
  message: "Property '{propName}' cannot be empty"
});

const InappropriateTypeError = defineError({
  name: 'FilterPanelBuilder',
  message: "'{propName} must be a '{type}'"
});

const InappropriateUnknownTypeError = defineError({
  name: 'FilterPanelBuilder',
  message: "invalid type of property '{propName}'"
});

export { PropertyPresenceError, InappropriateTypeError, InappropriateUnknownTypeError };
