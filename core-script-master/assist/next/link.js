


import Link from 'next/link'

// Link can use prefetch

// https://github.com/zeit/next.js#prefetching-pages

<Link prefetch href="/about"></Link>

<Link href={{ pathname: '/about', query: { name: 'Zeit' }}}></Link>


<a onClick={() => setTimeout(() => url.pushTo('/dynamic'), 100)}>
A route transition will happen after 100ms
</a>
{// but we can prefetch it!
Router.prefetch('/dynamic')}

// 弹窗类型用这个
// Shallow routing allows you to change the URL without running getInitialProps. You'll receive the updated pathname and the query via the url prop of the same page that's loaded, without losing state
// Shallow Routing 
// 这个可以去看一下
Router.push(href, as, { shallow: true })

Router.push({
  pathname: '/about',
  query: { name: 'Zeit' }
})

// props: replace prefetch href

// as: https://learnnextjs.com/basics/clean-urls-with-route-masking/route-masking

// as is router masking that show to user, but actual url is the href prop

// but this has some confused thing such as reload dirty router will occur 404 page