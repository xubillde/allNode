var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

import { PROJECT_BASE_PATH } from '../src.config'

import createRestApiReduxFlow from '../api/bin/createRestApiReduxFlow'


createRestApiReduxFlow(PROJECT_BASE_PATH)