import path from 'path'
import templateConfig from '../../config'
import { PACKAGE_BASE_PATH } from '../../../src.config'

export default () => `
// [接口定义] // file:/${path.join(PACKAGE_BASE_PATH, templateConfig.propType)}
import PropTypes from 'prop-types'
`