const Koa = require("koa");
const path = require("path");
const cors = require('koa2-cors')//跨域配置
const koaBody = require("koa-body");
const parameter = require("koa-parameter");

const routing = require("./routers");
const app = new Koa();

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
app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(parameter(app));
routing(app);

app.listen(3001);
