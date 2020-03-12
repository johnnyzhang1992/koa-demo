var bcrypt = require("bcryptjs");

const tools = {
    // 密码加密
	enbcrypt: password => {
		var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    // 密码比对
    compareBcrypt: (password, hash) => { 
       return  bcrypt.compareSync(password, hash);
    }
};

module.exports = tools;

