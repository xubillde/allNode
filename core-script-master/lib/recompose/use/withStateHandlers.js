"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "withStateHandlers(\n  ({ initialCounter = 0 }) => ({\n    counter: initialCounter,\n  }),\n  // (state:Object, props:Object) => (...payload: any[]) => Object\n  {\n    incrementOn: ({ counter }) => (value) => ({\n      counter: counter + value,\n    }),\n    decrementOn: ({ counter }) => (value) => ({\n      counter: counter - value,\n    }),\n    resetCounter: (state, { initialCounter = 0 }) => () => ({\n      counter: initialCounter,\n    })\n  }\n)";