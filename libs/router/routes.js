const Router = require('koa-router')
const path = require('path')
const fs = require('fs')

//前缀
const router = new Router({ prefix: '/api' })

//获取本地指定图片发送到前端
router.get('/files', async ctx => {
  const filepath = path.join(__dirname, '../public/picture1.jpg')
  const files = fs.createReadStream(filepath)
  ctx.set('Content-Type', 'image/jpg')
  ctx.body = files
})

//获取本地指定id的图片发送到前端
router.get('/files/:id', async ctx => {
  const fileId = Number(ctx.params.id)
  const filedir = path.join(__dirname, '../public')
  let filelist = fs.readdirSync(filedir)
  //判断这个输入的id是否是合理的
  let len = filelist.length
  if (fileId > len || fileId < 1) {
    ctx.body = {
      code: 404,
      msg: '文件不存在'
    }
    return
  }
  let fileName = filelist[fileId - 1]
  //获取这个名字的图片
  const filepath = path.join(__dirname, '../public/' + fileName)
  const files = fs.createReadStream(filepath)
  ctx.set('Content-Type', 'image/jpg')
  ctx.body = files
})

//接收前端传来的图片并存入文件夹中
router.post('/files', async ctx => {


})

//删除指定id的图片
router.delete

module.exports = router
