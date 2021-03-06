const jwt = require("jsonwebtoken");

const tools = require("../utils/tools");
const User = require("../models/user");
const config = require("../config");

const { tokenSecret } = config;

/**
 * @description User 控制器
 */
class UserController {
	/**
	 * @description 根据条件查询用户
	 * @param {*} ctx
	 */
	async findOne(ctx) {
		// 当前登录用户
		// const { name, email, id } = ctx.state.user;
		// 路由匹配
		// const { id } = ctx.params;
		// URL 参数
		let result = {};
		const query = ctx.request.query;
		const { email, name } = ctx.request.query;
		if (email) {
			result = await User.findOne({ email });
		} else if (name) {
			result = await User.findOne({ name });
		}
		const { password, ...rest } = result && result._doc ? result._doc : {};
		ctx.body = {
			status_code: 200,
			query,
			user: rest,
			current_user: ctx.state.user
		};
	}

	/**
	 * @description 创建用户
	 * @param {*} ctx
	 */
	async register(ctx) {
		ctx.verifyParams({
			name: { type: "string", required: true },
			email: { type: "string", required: true },
			password: { type: "string", required: true }
		});
		const { email, name, password } = ctx.request.body;
		const findResult = await User.find({ email });
		if (findResult.length > 0) {
			ctx.status = 500;
			ctx.body = {
				message: "email is exit!",
				data: findResult
			};
		} else {
			ctx.status = 200;
			const newUser = new User({
				email,
				name,
				password: tools.enbcrypt(password)
			});
			console.log(newUser);
			await newUser
				.save()
				.then(user => {
					console.log(user);
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

	/**
	 * @description 用户登录
	 * @param {*} ctx
	 */
	async login(ctx) {
		ctx.verifyParams({
			email: { type: "string", required: true },
			password: { type: "string", required: true }
		});
		const { email, password } = ctx.request.body;
		const findResult = await User.find({ email });
		if (findResult.length === 0) {
			// 用户不存在
			ctx.status = 200;
			ctx.body = {
				message: "email not exit"
			};
		} else {
			// 密码对比
			const isTrue = tools.compareBcrypt(password, findResult[0].password);
			if (isTrue) {
				const { id, name } = findResult[0];
				const payload = { id, name };
				const token = jwt.sign(payload, tokenSecret, { expiresIn: 3600 });
				// 密码正确
				ctx.body = {
					message: "login in",
					token: "Bearer " + token,
					data: findResult[0]
				};
			} else {
				// 错误
				ctx.status = 401;
				ctx.body = {
					message: "password wrong"
				};
			}
		}
	}
}

module.exports = new UserController();
