const Router = require("koa-router");

const { create} = require('../controllers/users');

const router = new Router({
	prefix: "/users"
});

router.get("/", async function(ctx) {
	ctx.verifyParams({
		name: { type: "string", required: true }
		// age: {type: 'number', required: false}
	});
	ctx.body = {
		user: [
			{
				name: "jake",
				age: 23,
				id: 22
			}
		],
		status_code: 200
	};
});

router.get("/:id", async function(ctx) {
	//从ctx中读取get传值

	console.log(ctx.query); //{ aid: '123' }       获取的是对象   用的最多的方式  **推荐
	console.log(ctx.querystring); //aid=123&name=zhangsan      获取的是一个字符串
	console.log(ctx.url); //获取url地址
	//ctx里面的request里面获取get传值
	console.log(ctx.request.url);
	console.log(ctx.request.query); //{ aid: '123', name: 'zhangsan' }  对象
	console.log(ctx.request.querystring); //aid=123&name=zhangsan
	// params
	console.log(ctx.params);

	// 参数验证
	ctx.verifyParams({
		name: { type: "string", required: true }
		// age: {type: 'number', required: false}
	});
	ctx.body = {
		user: {
			name: "jake",
			age: 23,
			id: 22
		},
		status_code: 200
	};
});

router.post(
	"/create",
	create
);

module.exports = router;
