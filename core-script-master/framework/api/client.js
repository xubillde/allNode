import { ALL_CONFIG_ENV } from '../config.js'


// 在文件夹里定义项目不同环境下对应的根路由
// ！！！：依赖项目环境定义的常量字段

// Config BASE_URL
/* ┌────────────────────────────────────────────────────────────────────────────┐  */

// const defaultBaseURL = 'http://api.rrzcp8.com/biFen_matchDetailOdds.html?mobileType=android&deviceId=865960033443192&channel=tgwvivo8&apiLevel=32&apiVer=1.1&ver=1.11.1&product=caipiao_client'
const defaultBaseURL = 'https://jsonplaceholder.typicode.com'
const defaultResServer = 'https://jsonplaceholder.typicode.com'

const API_SERVER_CONFIG = {
  [ALL_CONFIG_ENV.production]: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    resServer: 'https://jsonplaceholder.typicode.com'
  },
  [ALL_CONFIG_ENV.rc]: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    resServer: 'https://jsonplaceholder.typicode.com'
  },
  [ALL_CONFIG_ENV.test]: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    resServer: 'https://jsonplaceholder.typicode.com'
  },
  [ALL_CONFIG_ENV.development]: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    resServer: 'https://jsonplaceholder.typicode.com'
  }
}
/*  └────────────────────────────────────────────────────────────────────────────┘ */


const apiConfig =  API_SERVER_CONFIG[process.env]
export const baseURL = apiConfig && apiConfig.baseURL || defaultBaseURL
export const resServer =  apiConfig && apiConfig.resServer || defaultResServer