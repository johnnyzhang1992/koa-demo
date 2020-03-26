const mongoose = require("mongoose"); // 数据库

const config = require("../config");

const { mongoURI } = config;

// ----- 数据库连接 ----start
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: false,
	keepAlive: 120
});

module.exports = {
	connect: () => {
		// debug 模式
		mongoose.set("debug", true);
		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", function() {
			// we're connected!
			console.log("mongoose connection---");
		});
		// ----- 数据库连接 ----end
	}
};
