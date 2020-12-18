
const TODO = 0
const DOING = 1
const DONE = 2

const URL = 'url_access'
const BACK = 'back_access' // 后期运算时插入，只要存在target的均加入BACK
const CLIENT = 'client_jump_access'

// 未来加管理字段？比如插入关联组件，接入的api
const pages = [

  // 可以抽出简单部分（或者叫产品配置部分）但是普通人配置可能会把可能是相同页面分成不同的页面
  // 这些配置抽成不同的路由配置？
  {
    tag: 'book',
    name: '成长册入口页',
    page: 'book/entry.js', // 注意路径相关的数据无论是写大小写，路径中的key首字母都会变为大写
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0556e21e5268f0b5159bdf',
    ],
    state: TODO,
    desc: '宝贝入口页，用于选择打开哪本成长册',
    comment: '3d轮播图还需要两天，效果还不理想，实现方法可在尝试', // 弹幕系统
    router: {
      source: [CLIENT], // 如果存在target，那么source中插入该target
      target: ['order/entry.js']
    },
    components: [], // 已有或者后期加入的可有脚本扫描后插入，手写的时候就考虑没做或者需要做的
    apis: [] // 后期自动化接入进行完善, 底层向上接入，确保存在一对一，或者映射关系
  },


  {
    tag: 'order',
    name: '商品购买页',
    page: 'order/entry.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0556f59e2a1227f99d780b',
    ],
    state: DOING,
    desc: '商品购买页',
    comment: [
      '重点页面',
      '评论页要拆出来，一个嵌入式feed流不好用',
      '页面细节还有些出入，还需要修改一下，数据没接',
    ],
    router: {
      source: [],
      target: ['order/entry?showSheet=true', 'book/preview.js', 'order/detail.js']
    },
    components: [],
    apis: [],
    children: [
      {
        page: 'order/entry?showSheet=true',
        name: '商品购买页版本商品类别选择弹窗',
        designs: [
          'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0557835f49c9a63c838c8e',
        ],
        state: DOING,
        desc: '弹出来选择版本和数量等',
        comment: '预加载还要做一下优化，可做一下向下滑动后退',
        router: {
          source: [],
          target: []
        },
        components: [],
        apis: []
      }
    ]
  },


  {
    tag: 'book',
    name: '成长册预览页',
    page: 'book/preview.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0557029484998811e3b78f',
    ],
    state: DOING,
    desc: '成长册预览，滑动滑条查看所有成长册页面',
    comment: '主要是翻书布局，需要在设计细节和过程',
    router: {
      source: [],
      target: []
    },
    components: [],
    apis: []
  },


  {
    tag: 'order',
    name: '订单确认页',
    page: 'order/detail.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0557661ef4ee1549449f98',
    ],
    state: DOING,
    desc: '点击购买后跳到该页面',
    comment: [
      '优惠券流程还需要修改，点击提交订单以后支付方式选择弹窗还未做, 弹出学期购买弹窗的流程需要改一下，此页的预购券策略目前也被砍掉',
    ],
    router: {
      source: [],
      target: []
    },
    components: [],
    apis: []
  },


  {
    tag: 'pay',
    name: '支付回调页',
    page: 'pay/callback.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05580713270c63fec92a87', // 预购成功
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05589da3f23603038d8297', // 额外支付成功
    ],
    state: TODO,
    desc: '支付结束后结果反馈页面',
    comment: '这里有第一次支付回调，也有支付额外费用成功的回调，觉得这里应该合并一下',
    router: {
      source: [],
      target: ['book/collect.js', ] // 如果达标了直接进入成长册编辑
    },
    components: [],
    apis: []
  },

  {
    tag: 'pay',
    name: '交易成功页',
    page: 'pay/success.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558da00a65e71aca7cb23', // 交易成功页
    ],
    state: TODO,
    desc: '成功购买后的默认回调页',
    comment: '',
    router: {
      source: [],
      target: ['comment/order'] // 如果达标了直接进入成长册编辑
    },
    components: [],
    apis: []
  },

  {
    tag: 'comment',
    name: '订单评价页',
    page: 'comment/order.js',
    designs: [

    ],
    state: TODO,
    desc: '支付结束后结果反馈页面',
    comment: '这里有第一次支付回调，也有支付额外费用成功的回调，觉得这里应该合并一下，评价成功后的回调在哪里？',
    router: {
      source: [],
      target: ['comment/order'] // 如果达标了直接进入成长册编辑
    },
    components: [],
    apis: []
  },

  {
    tag: 'book',
    name: '成长册采集页',
    page: 'book/collect.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558484c5269080f42e73a',
    ],
    state: DOING,
    desc: '动态采集页，在此页采集足够的动态后才能进入编辑成长册',
    comment: '这一页的逻辑/流程还未确定，需要讨论修改',
    router: {
      source: [],
      target: [CLIENT, ] // CLIENT，需要跳到客户端 采集动态 或者 发布动态
    },
    components: [],
    apis: []
  },

  {
    tag: 'book',
    name: '成长册阅读器',
    page: 'book/reader',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05586c29b0c50121ce61dd', // 封面页
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05589d8166866bac667204', // 封底页
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05586a5947ac05adc4586c', // 编辑动态弹窗
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05586b5cb2a8a7e5ce5656', // 选择裁剪照片弹窗
    ],
    state: TODO,
    desc: '动态采集页，在此页采集足够的动态后才能进入编辑成长册',
    comment: '完成后的跳转流程还需要确认下, 完成后的弹窗额外支付告之需优化',
    router: {
      source: [],
      target: ['weibo/edit.js', 'photo/crop.js', 'order/detail.js'] // 这个还不确定
    },
    components: [
      {
        name: '封面页组件',
        path: 'bookPage/cover',
        state: TODO,
        desc: '成长册的封面页，可编辑'
      }
    ],
    apis: []
  },

  {
    tag: 'weibo',
    name: '编辑动态页',
    page: 'weibo/edit.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a05584599a9053e4321a311',
    ],
    state: TODO,
    desc: '动态编辑页，有音频播放器和列表排序器',
    comment: '',
    router: {
      source: [],
      target: []
    },
    components: [],
    apis: []
  },

  {
    tag: 'photo',
    name: '图片裁剪页',
    page: 'photo/crop.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558855abbf66a3a68266d',
    ],
    state: TODO,
    desc: '用于裁剪图片，图片裁剪器还需要再优化下',
    comment: '',
    router: {
      source: [],
      target: []
    },
    components: [],
    apis: []
  },


  {
    tag: 'order',
    name: '订单列表页',
    page: 'order/list.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558be039546d8b619edc0',
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558bd07a34d3f17e057d6' // 订单缺省页
    ],
    state: TODO,
    desc: '用于裁剪图片，图片裁剪器还需要再优化下',
    comment: '',
    router: {
      source: [],
      target: ['order/item.js']
    },
    components: [],
    apis: []
  },

  {// 这个要作为list-item应用研究的典型
    tag: 'order',
    name: '订单列表页',
    page: 'order/item.js',
    designs: [
      'https://app.zeplin.io/project/599ff2ad5b010e07714668fb/screen/5a0558be039546d8b619edc0',
    ],
    state: TODO,
    desc: '显示所有订单',
    comment: '分享到微信有什么必要吗？ 确认收货后有个评价提示弹窗',
    router: {
      source: [],
      target: ['comment/order.js']
    },
    components: [],
    apis: []
  },

  // 优惠券页已被砍掉
]



const components= [
  {
    name: '3d轮播图',
    path: '3dBookCarousel',
    state: DOING,
    desc: '3d轮播选择对象'
  }
]

module.exports = {
  pages,
  components
}