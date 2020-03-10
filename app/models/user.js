/*
 * @Author: johnnyzhang1992
 * @Email: zq19920306@gmail.com
 * @Description: user collection
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
	{
		email: {
            type: String,
            unique: true,
			require: true
        },
        password: {
            type: String,
            required: true
        },
        		userName: {
			type: String
		},
		phone: {
			type: String
		},
	},
	{ collection: "user", versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);
