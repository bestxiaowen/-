// 解决跨域问题
// webpack 自带的解决跨域配置

module.exports = {
    //express
    devServer: {
        proxy: {
            "/urlload": {
                target: "http://console.ranyunlong.com:8080",
                pathRewrite: { "^/urlload": "/renren-fast" }
            }
        }
    }

}