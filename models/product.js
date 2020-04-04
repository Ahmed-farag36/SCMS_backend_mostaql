const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: String,
	category: String,
	brand: String,
	description: String,
	images: [String],
	quantity: Number,
	sold: {
		type: Number,
		default: 0
	},
	shippedFrom: String,
	supplierId: String,
	price: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	rating: {
		type: Number,
		default: 0
	},
	spec1: String,
	spec2: String,
	spec3: String,
	addedAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Product", productSchema);
