const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const multer = require('@koa/multer')

const errorCode = require('../common/errorcode')

//前缀
const router = new Router({ prefix: '/api' })

//获取本地指定图片发送到前端
router.get('/files', async ctx => {
  try {
    const filepath = path.join(__dirname, '../public/aaa.jpg')
    if (!fs.existsSync(filepath)) {
      throw Error('FILE_IS_NOT_EXIST')
    } else {
      const files = fs.createReadStream(filepath)
      ctx.set('Content-Type', 'image/jpg')
      ctx.body = files
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      msg: errorCode[err.message].message,
      status: errorCode[err.message].status
    }
  }
})

//获取本地指定id的图片发送到前端
router.get('/files/:id', async ctx => {
  try {
    const fileId = Number(ctx.params.id)
    const filedir = path.join(__dirname, '../public')
    let filelist = fs.readdirSync(filedir)
    //判断这个输入的id是否是合理的
    let len = filelist.length
    if (fileId > len - 1 || fileId < 0) {
      throw Error('ID_IS_NOT_AVAILABLITY')
    } else {
      let fileName = filelist[fileId - 1]
      //获取这个名字的图片
      const filepath = path.join(__dirname, '../public/' + fileName)
      //判断这个图片是否存在
      if (!fs.existsSync(filepath)) {
        throw Error('FILE_NOT_EXIST')
      }
      const files = fs.createReadStream(filepath)
      ctx.set('Content-Type', 'image/jpg')
      ctx.body = files
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      msg: errorCode[err.message].message,
      status: errorCode[err.message].status
    }
  }
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
    }else{
      throw Error('UPLOAD_FAILED')
    }
  } catch (err) {
    ctx.body = {
      code: 404,
      msg: errorCode[err.message].message,
      status: errorCode[err.message].status
    }
  }
})

//删除指定的图片，根据图片id
router.delete('/files/:id', async ctx => {
  let id = Number(ctx.params.id)
  let filedir = path.join(__dirname, '../public/')
  let filelist = fs.readdirSync(filedir)
  let len = filelist.length
  //判断这个id的合理性
  try {
    //删除这个对应的文件
    if (id > len || id < 1) {
      throw Error('ID_IS_NOT_AVAILABLITY')
    } else {
      let filename = filelist[id - 1]
      const filepath = path.join(__dirname, '../public/' + filename)
      fs.unlinkSync(filepath)
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    }
  } catch (err) {
    ctx.body = {
      code: 400,
      msg: errorCode[err.message].message,
      status: errorCode[err.message].status
    }
  }
})


module.exports = router
