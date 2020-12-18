/*
 * @param {Array}  themeArray 主题数组
 * @param {*}  readUrl 被读取得原css文件的地址路径
 * @param {*} writeUrl 被写入的css文件的地址路径
 * @param {Obj} imgHashArray 图片的后缀哈希值
 * @param {*} color 需要更新的主题颜色
 * @param {string} themeName 需要更新的主题颜色的主题名前缀
 */
var objTheme={
    themeArray:[
        {
            readUrl:'../static/theme/theme-orange.css',
            writeUrl:'../static/theme/theme-blue.css',
            imgHashArray:{
                study_clockimg:'64ea2e56-b415-489a-9084-53c115916581',
                bgimg_completed:'b6a00e88-0d42-42e6-861e-9c1928efeb04',
                challengeFalsebgImg:'7546953f-4033-42d6-b199-88edc55c543d',
                challengeTruebgImg:'57765a19-4e00-4a2e-8170-2bb80f82e87d',
                challenge_active_bg:'0f6f006f-84ba-4448-8452-fae6ae68c1cc',
                challenge_disabled_bg:'5e4ff8c9-7460-470e-a370-14793ed2a159',
                navicon_active_study:'64f5fd3e-951a-46ee-9ea7-fabf1f1ecc6e',
                navicon_active_course:'43a0b4a1-14e3-4aeb-b340-29a176bef7df',
                navicon_active_training:'6c117778-abbf-4751-bc02-28bcf37038f4',
                navicon_active_user:'30a22662-5f21-4b34-b73b-1790ef4ed3a8'
            },
            themeName:'theme-blue',
            color:'#2978e6'
        }
    ]
}
module.exports = objTheme