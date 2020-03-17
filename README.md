# koa-demo

node.js 框架 Koa 的一些练习。

- 路由控制
- JWT 用户权限控制
- mongodb 数据库的使用
- 文件的上传和下载
- 静态资源的加载

## 使用指南

- 需要本地安装 MongoDB，并且运用中
- 拷贝 `app/config.js.bat` 新建文件`app/config.js`，配置文件内参数可随机修改

```js
module.exports = {
    mongoURI: "mongodb://localhost:27017/<test>", // monogodb 链接地址
    tokenSecret: "TokenSecret" //JWT加密时，所需参数
}
```