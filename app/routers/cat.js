const mongoose = require("mongoose");
const Router = require("koa-router");

// const mongoURI = require("../config").mongoURI;
// // const { create, findOne } = require("../controllers/users");
// console.log(mongoURI);
// mongoose
// 	.connect(mongoURI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	})
//     .then(res => {
//         console.log('connection----')
// 	})
//     .catch(err => {
//         console.log('err:----')
// 		console.log(err);
// 	});

const router = new Router({
	prefix: "/cats"
});

router.get("/", ctx => {
	// const Cat = mongoose.model("Cat", { name: String });

	// const kitty = new Cat({ name: "Zildjian" });
	// kitty.save().then(() => console.log("meow"));
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", function() {
		// we're connected!
		console.log("---open");
	});
	ctx.body = {
		message: "test message"
	};
});

// router.post("/create", create);

module.exports = router;
