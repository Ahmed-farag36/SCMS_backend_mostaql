const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	inventory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			default: []
		}
	],
	role: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("User", userSchema);
