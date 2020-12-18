var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

import { PROJECT_BASE_PATH } from '../src.config'

import createGraphqlApi from '../api/bin/createGraphqlApi'


createGraphqlApi(PROJECT_BASE_PATH)