/**
 * @description:
 * @author:Zhang Xiao
 * @date: 2023-08-04 14:08:42
 * @version: V1.0.0
 **/

// 获取元素
const content = document.querySelector('.content')
const img = document.getElementById('img')

// 执行函数
async function getpic () {
  const url = 'http://localhost:8100/api/files'
  const target = await httpSend(url)
  img.setAttribute('src',target)
}

async function quitpic(){
  img.setAttribute('src',)
}

// 发送请求
async function httpSend (url) {
  return fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise(callback => {
          let reader = new FileReader()
          reader.onload = function () {
            callback(this.result)
          }
          reader.readAsDataURL(blob)
        })
    )
}
