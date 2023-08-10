/**
 * @description:
 * @author:Zhang Xiao
 * @date: 2023-08-04 14:08:42
 * @version: V1.0.0
 **/

// 获取元素
const content = document.querySelector('.content')
const img = document.getElementById('img')
const ipt = document.getElementById('ipt')
const picfile = document.getElementById('picfile')

// 执行函数
async function getpic () {
  const url = 'http://localhost:8100/api/files'
  const target = await httpSend(url)
  img.setAttribute('src', target)
}

//将图片的内容置为空
async function quitpic () {
  img.setAttribute('src', '')
}

//根据输入的id值去获取
async function getpicById () {
  const id = ipt.value
  const url = `http://localhost:8100/api/files/${id}`
  const target = await httpSend(url)
  if (target) {
    img.setAttribute('src', target)
  }
  ipt.value = null
}

// 将选择的图片展示在前端的页面中
picfile.onchange = function () {
  let rd = new FileReader()
  let file = this.files
  rd.readAsDataURL(file[0])
  rd.onload = function () {
    img.setAttribute('src', rd.result)
  }
}

// 将展示的图片发送给后端,并将页面显示置空
async function sendpic () {
  const formData = new FormData()
  const file = picfile.files[0]
  formData.append('picture', file)
  const url = 'http://localhost:8100/api/upload'
  fetch(url, {
    method: 'post',
    body: formData
  }).then(async res => {
    if (res.status === 200) {
      picfile.value = null
      await quitpic()
    } else {
      console.log('上传失败')
    }
  })
}

// 发送请求从后端获取图片
async function httpSend (url) {
  // return fetch(url)
  //   // .then(response => response.blob())
  //   .then(response => console.log(response,'------------'))
  //   .then(
  //     blob =>
  //       new Promise(callback => {
  //         let reader = new FileReader()
  //         reader.onload = function () {
  //           callback(this.result)
  //         }
  //         reader.readAsDataURL(blob)
  //       })
  //   )
  const data = await fetch(url)
  const blob = await data.blob()
  if (blob.type === 'application/json') {
    alert('你选择的图片不存在')
  } else {
    return new Promise(callback => {
      let reader = new FileReader()
      reader.onload = function () {
        callback(this.result)
      }
      reader.readAsDataURL(blob)
    })
  }
}
