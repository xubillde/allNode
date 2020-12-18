const CONFIG = {
	PAGE_RIGHT_TEXT: '我的能量',
	SHARE: {
		TITLE: '我想解锁VIP章节，帮我攒下能量值',
		DESC: '朋友，江湖救急，只需要点点点玩游戏，就能助我解锁100章！'
  }
}

LBF.define("ecy_activity/2018/62433353/js/index.js", require => {
	let platformType = untils.getPlatformType()
	const AJAX_HOST = platformType === 'local' ? 'https://yapi.yuewen.com/mock/212' : '';
	let view = {
    init: function() {
      this.bindEvent()
    },
    bindEvent: function() {

    }
  }
  view.init()
})
