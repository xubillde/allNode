const upperFirst = require('lodash/upperFirst')

export default (state) => `withState('${state || 'state'}', 'set${upperFirst(state) || 'State'}', ({ props }) => false),`