const mongoose = require("mongoose");

const User = require("../models/user");
const mongoURI = require("../config").mongoURI;

mongoose.set("useCreateIndex", true);
mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(res => {
		console.log("connection----");
	})
	.catch(err => {
		console.log("err:----");
		console.log(err);
	});

class UserController {
	/**
	 * @description根据条件查询用户
	 * @param {*} ctx
	 */
	async findOne(ctx) {
		// 路由匹配
		const { id } = ctx.params;
		// URL 参数
		const query = ctx.request.query;
		ctx.body = {
			status_code: 200,
			query,
			id
		};
	}

	/**
	 * @description 创建用户
	 * @param {*} ctx
	 */

	async create(ctx) {
		ctx.verifyParams({
			name: { type: "string", required: true },
			email: { type: "string", required: true },
			password: { type: "string" }
		});
		const findResult = await User.find({ email: ctx.request.body.email });
		if (findResult.length > 0) {
			ctx.status = 500;
			ctx.body = {
				message: "email is exit!",
				data: findResult
			};
		} else {
			const { email, name, password } = ctx.request.body;
			ctx.status = 200;
			const newUser = new User({
				email,
				name,
				password
			});
			// console.log(newUser);
			await newUser
				.save()
				.then(user => {
					ctx.body = user || {
						message: "用户创建失败"
					};
				})
				.catch(err => {
					console.log(err);
					ctx.body = {
						message: "用户创建失败"
					};
				});
		}
	}
}

module.exports = new UserController();
