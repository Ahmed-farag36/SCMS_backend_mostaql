const Order = require("../models/order");

const getAll = () => {
	return Order.find();
};

const getOne = orderId => {
	return Order.findById(orderId);
};

const getAllForSupplier = supplierId => {
	return Order.find({ supplierId, type: "Confirmed" });
};

const getAllForCustomer = customerId => {
	return Order.find({ customerId, type: "Confirmed" });
};

const getAllOffersForCustomer = customerId => {
	return Order.find({ customerId, type: { $ne: "Confirmed" } });
};

const sendOrderInquire = (customerId, supplierId, products) => {
	return Order.create({
		supplierId: supplierId,
		customerId,
		status: "Processing",
		type: "Inquire",
		products
	});
};

const supplierCancel = orderId => {
	return Order.updateOne({ _id: orderId }, { status: "Cancelled by supplier" });
};

const customerCancel = orderId => {
	return Order.updateOne({ _id: orderId }, { status: "Cancelled by Customer" });
};

const adminOffer = orderId => {
	// TODO: return 3 lowest prices for every product
	return Order.updateOne(
		{ _id: orderId },
		{ status: "Processing", type: "Offer" }
	);
};

const customerConfirm = orderId => {
	return Order.updateOne(
		{ _id: orderId },
		{ status: "Preparing", type: "Confirm" }
	);
};

module.exports = {
	getAll,
	getOne,
	getAllForSupplier,
	getAllForCustomer,
	getAllOffersForCustomer,
	sendOrderInquire,
	supplierCancel,
	customerCancel,
	adminOffer,
	customerConfirm
};
