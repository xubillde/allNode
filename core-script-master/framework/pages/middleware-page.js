import { Component } from 'react'

import 'isomorphic-unfetch'

// 修改名称即可

export default class Index extends Component {
  static async getInitialProps ({ res }) {

    const resp = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const resData = await resp.json()

    console.log(resData, 'response data');

    if (resData.userId === '1' || resData.userId === 1) {
      res.setHeader('Location', '/Project/list')
    } else {
      res.setHeader('Location', '/Project/item?id=1')
    }
    
    res.statusCode = 302
    res.end()
    return {}
  }

  render () {
    return null
  }
}