/**
* @description:将本地图片或文本文件传给前端，或从前端接收图片或其他类型的文件存在本地
* @author:Zhang Xiao
* @date: 2023-08-03 17:01:35
* @version: V1.0.0
**/
'use strict';

/**
 * 使用Koa框架进行开发
*/

const Koa = require('koa')
const cors = require('koa-cors')
const app = new Koa()

const PORT = 8100
const router = require('./router/routes')

app.use(cors())
app.use(router.routes())

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})