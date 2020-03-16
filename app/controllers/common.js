const path = require("path");

/**
 * 通用控制器
 */
class CommonController {
    async upload(ctx) {
        // ctx.verifyParams({
		// 	file: { type: "string", required: true },
		// });
    }
}

module.exports = new CommonController();