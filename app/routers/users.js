const Router = require("koa-router");

const { register, findOne, login } = require("../controllers/users");
const passport = require('koa-passport');

const router = new Router({
	prefix: "/users"
});

/**
 * @reouter "/user/login"
 * @description 用户注册
 * @access 公开
 */
router.post("/register", register);

/**
 * @reouter "/user/login"
 * @description 用户登录
 * @access 公开
 */
router.post("/login", login);

/**
 * @reouter "/user/:id"
 * @description 获取某个用户的详细信息
 * @access 登录验证
 */
router.get("/:id", passport.authenticate('jwt', { session: false }),findOne);

module.exports = router;
