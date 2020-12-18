



// route - String of the current route
// pathname - String of the current path excluding the query string
// query - Object with the parsed query string. Defaults to {}
// asPath - String of the actual path (including the query) shows in the browser
// push(url, as=url) - performs a pushState call with the given url
// replace(url, as=url) - performs a replaceState call with the given url

// 仅能用在客户端
import Router from 'next/router'
Router.push({
  pathname: '/about',
  query: { name: 'Zeit' }
})