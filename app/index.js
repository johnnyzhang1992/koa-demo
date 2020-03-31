const Koa = require("koa");
const path = require("path");
const cors = require("koa2-cors"); //跨域配置
const koaBody = require("koa-body"); // 请求body 解析
const parameter = require("koa-parameter"); // 请求参数处理功能
const static = require("koa-static"); // 静态资源
const passport = require("koa-passport"); // token验证解析
const mongoConfig = require("./config/mongo"); // 数据库

const routing = require("./routers");

const app = new Koa();


// 静态资源目录对于相对入口文件index.js的路径
const staticPath = "./static";

app.use(static(path.join(__dirname, staticPath)));
// 文件上传
app.use(
	koaBody({
		multipart: true, // 支持文件上传
		encoding: "gzip",
		formidable: {
			// uploadDir: path.join(__dirname, "static/uploads"), // 设置文件上传目录
			keepExtensions: true, // 保持文件的后缀
			maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小 2M
			hash: 'md5',
			// onFileBegin: (name, file) => {
			// 	// 文件上传前的设置
			// 	console.log(`name: ${name}`);
			// 	console.log(file);
			// }
		}
	})
);

// 连接数据库
mongoConfig.connect();

// 跨域配置
// var whitelist = ["http://example1.com", "http://example2.com"];

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
		],
		optionsSuccessStatus: 204,
		// origin: function(ctx) {
		// 	console.log(ctx);
		// 	if (!whitelist.includes(ctx.request.header.origin)) {
		// 		return false;
		// 	}
		// 	return "*";
		// }
	})
);

// 参数校验
// 变量类型以及是否缺少的检查
app.use(parameter(app));

// token 验证
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport")(passport);

// 路由配置
routing(app);

app.listen(3001);
