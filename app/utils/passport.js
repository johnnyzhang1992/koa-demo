/**
 * @author zq19920306
 * @description 用户登录验证 
 */
var JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;

const config = require("../config");
const User = require("../models/user");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.tokenSecret;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async function (jwt_payload, done) {
			const user = await User.findOne({ _id: jwt_payload.id });
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
	);
};
