const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const multer = require('@koa/multer')

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

//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/'))
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  files: 1 //文件数量
}
const upload = multer({ storage, limits })

//接收前端传来的图片并存入文件夹中
router.post('/upload', upload.single('picture'), async ctx => {
  try {
    const files = ctx.file
    if (files.filename) {
      ctx.body = {
        code: 200,
        msg: '上传成功'
      }
    }
  } catch (err) {
    ctx.body = {
      code: 404,
      msg: err
    }
  }
})
module.exports = router
