const Koa = require("koa");
const path = require("path");
const cors = require("koa2-cors"); //跨域配置
const koaBody = require("koa-body");
const parameter = require("koa-parameter");
const static = require("koa-static"); // 静态资源

const routing = require("./routers");
const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = "./static";

app.use(static(path.join(__dirname, staticPath)));
console.log(path.join(__dirname, staticPath));
// 文件上传
app.use(
	koaBody({
		multipart: true, // 支持文件上传
		encoding: "gzip",
		formidable: {
			uploadDir: path.join(__dirname, "public/uploads"), // 设置文件上传目录
			keepExtensions: true, // 保持文件的后缀
			maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小 2M
			onFileBegin: (name, file) => {
				// 文件上传前的设置
				// console.log(`name: ${name}`);
				// console.log(file);
			}
		}
	})
);

// 跨域配置
app.use(
	cors({
		exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
		maxAge: 100,
		credentials: true,
		allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
		allowHeaders: [
			"Content-Type",
			"Authorization",
			"Accept",
			"X-Custom-Header",
			"anonymous"
		]
	})
);

// 参数校验
// 变量类型以及是否缺少的检查
app.use(parameter(app));

// 路由配置
routing(app);

app.listen(3001, () => {
	console.log("[demo] static-use-middleware is starting at port 3000");
});
