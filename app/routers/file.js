const Router = require("koa-router");

const { upload } = require("../controllers/common");
const passport = require('koa-passport');

const router = new Router({
	prefix: "/file"
});

/**
 * @reouter "/file/upload"
 * @description 上传文件
 * @access 登录验证
 */
router.post("/upload", passport.authenticate('jwt', { session: false }),upload);

module.exports = router;
