class UserController {
	// async find(ctx) {
	// 	const { per_page = 10 } = ctx.query;
	// 	const page = Math.max(ctx.query.page * 1, 1) - 1;
	// 	const perPage = Math.max(per_page * 1, 1);
	// 	ctx.body = await User.find({ name: new RegExp(ctx.query.q) })
	// 		.limit(perPage)
	// 		.skip(page * perPage);
	// }

	async findOne(ctx) {
		//从ctx中读取get传值
		console.log(ctx.query); //{ aid: '123' } 获取的是对象, 用的最多的方式  **推荐
		console.log(ctx.querystring); //aid=123&name=zhangsan, 获取的是一个字符串
		console.log(ctx.url); //获取url地址
		//ctx里面的request里面获取get传值
		console.log(ctx.request.url);
		console.log(ctx.request.query); //{ aid: '123', name: 'zhangsan' }  对象
		console.log(ctx.request.querystring); //aid=123&name=zhangsan
		// params
		console.log(ctx.params);
		const { id } = ctx.params;
		// 参数验证
		// ctx.verifyParams({
		// 	name: { type: "string", required: true }
		// 	// age: {type: 'number', required: false}
		// });
		ctx.body = id === 23 ? {
			user: {
				name: "jake",
				age: 23,
				id
			},
			status_code: 200
		} : {
				message: 'user not find',
				status_code: 200
		};
	}

	async create(ctx) {
		ctx.verifyParams({
			name: { type: "string", required: true },
			age: { type: "string", required: true }
		});
		// const repeatedUser = await User.findOne({ name });
		const { name, age } = ctx.request.body;
		// const user = await new User(ctx.request.body).save();
		const user = {
			id: 23,
			name: name || "jake",
			age: age || 18
		};
		ctx.body = user;
	}
}

module.exports = new UserController();
