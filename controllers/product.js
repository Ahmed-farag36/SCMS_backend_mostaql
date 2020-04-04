const Product = require("../models/product");
const User = require("../models/user");

const getAll = () => {
	return Product.find();
};

const getOne = productId => {
	return Product.findById(productId);
};

const getAllForSupplier = supplierId => {
	return Product.find({ supplierId });
};

const getAllCustomerInventory = async customerId => {
	const { inventory: inventoryIds } = await User.findById(customerId);
	return Product.find({ _id: { $in: inventoryIds } });
};

const addOne = async (product, supplierId) => {
	console.log(product);
	await Product.create({
		...product,
		supplierId
	});
	return Product.find();
};

const delete1 = productId => {
	return Product.deleteOne({ _id: productId });
};

module.exports = {
	getAll,
	getOne,
	getAllForSupplier,
	getAllCustomerInventory,
	addOne,
	delete1
};
