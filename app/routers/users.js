const Router = require("koa-router");

const { register, findOne, login } = require("../controllers/users");

const router = new Router({
	prefix: "/users"
});

router.get("/", async function(ctx) {
	// ctx.verifyParams({
	// 	name: {
	// 		type: "string",
	// 		required: true
	// 	}
	// 	// age: {type: 'number', required: false}
	// });
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

router.get("/:id", findOne);

router.post("/register", register);

router.post("/login", login);

module.exports = router;
