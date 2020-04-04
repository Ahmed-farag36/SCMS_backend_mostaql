const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	supplierId: {
		type: String,
		required: true
	},
	customerId: {
		type: String,
		required: true
	},
	status: {
		type: String, // Proccessing, Preparing, Prepared, Shipped, Delivered, Cancelled by customer || supplier
		required: true
	},
	type: {
		type: String, // Inquire, Offer, Confirmed
		required: true
	},
	products: [
		{
			productId: String,
			productTitle: String,
			quantity: Number,
			price: Number
		}
	],
	issuedAt: {
		type: Date,
		default: Date.now
	},
	dueDate: Date
});

module.exports = mongoose.model("Order", orderSchema);
