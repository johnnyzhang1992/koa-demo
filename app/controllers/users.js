class UserController {
	// async find(ctx) {
	// 	const { per_page = 10 } = ctx.query;
	// 	const page = Math.max(ctx.query.page * 1, 1) - 1;
	// 	const perPage = Math.max(per_page * 1, 1);
	// 	ctx.body = await User.find({ name: new RegExp(ctx.query.q) })
	// 		.limit(perPage)
	// 		.skip(page * perPage);
	// }

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
