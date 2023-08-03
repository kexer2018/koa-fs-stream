const Router = require('@koa/router')
const path = require('path')
const fs = require('fs')

//前缀
const router = new Router({prefix:'/api'})

//此接口获取本地图片发送到前端
router.get('/files',async (ctx)=>{
    const filepath = path.join(__dirname,'../public/screenshot1.jpg')
    const files = fs.createReadStream(filepath)
    ctx.set('Content-Type','image/jpg')
    ctx.body = files
})


module.exports = router