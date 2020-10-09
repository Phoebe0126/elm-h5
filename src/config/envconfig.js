// 全局配置

let baseUrl = ''
let imgUrl,cdnUrl
if (process.env.NODE_ENV === 'development'){
  imgUrl = '//elm.cangdu.org/img/'
  cdnUrl = 'https://fuss10.elemecdn.com'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '//elm.cangdu.org'
  imgUrl = '//elm.cangdu.org/img/'
}

export  {
  baseUrl,
  imgUrl,
  cdnUrl
}

