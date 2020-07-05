const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
            target:"http://121.89.192.99:33333",
            changeOrigin:true,
            pathRewrite:{
            "^/api":""
            }
        })
    )
}