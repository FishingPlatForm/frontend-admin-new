
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        '/admin-page', // 指定需要转发的请求
        createProxyMiddleware({
            target: 'https://api.epicfish.cn',
            changeOrigin: true,
            pathRewrite(path) {
                return path.replace('/admin-page', '');
            }
        })
    );
}
