const errorCode = {
  ID_IS_NOT_AVAILABLITY: {status: 1001,message: 'ID不合理',fieldErrors: 'ID不合理',data: null},
  FILE_IS_NOT_EXIST:{status: 1002,message: '文件不存在',fieldErrors: '文件不存在',data: null},
  UPLOAD_FAILED:{status: 1003,message: '文件上传失败',fieldErrors: '文件上传失败',data: null},
}

module.exports = errorCode
