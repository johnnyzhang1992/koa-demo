/*
 * @Author: johnnyzhang1992
 * @Email: zq19920306@gmail.com
 * @Description: user collection
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
	{
		name: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			unique: true,
			require: true
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}
	}
);

module.exports = User = mongoose.model("users", UserSchema);
