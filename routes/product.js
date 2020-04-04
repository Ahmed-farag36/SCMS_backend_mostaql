const router = require("express").Router();
const passport = require("passport");
const fs = require("fs");
const path = require("path");

const {
	getAll,
	getOne,
	getAllForSupplier,
	getAllCustomerInventory,
	addOne,
	delete1,
	addToInventory,
	removeFromInventory
} = require("../controllers/product");

// AUTHENTICATION
// router.use(passport.authenticate("jwt", { session: false }));

router.get("/", async (req, res) => {
	const products = await getAll();
	res.json(products);
});

router.get("/:productId", async (req, res) => {
	const product = await getOne(req.params.productId);
	res.json(product);
});

router.get("/suppliers/:supplierId", async (req, res) => {
	const products = await getAllForSupplier(req.params.supplierId);
	res.json(products);
});

router.get("/customers/:customerId", async (req, res) => {
	const products = await getAllCustomerInventory(req.params.customerId);
	res.json(products);
});

router.post("/suppliers/new-product", async (req, res) => {
	const product = await addOne(req.fields, "5e84e7b317b59b3328a28b53");
	res.json(product);
});

router.delete("/:productId", async (req, res) => {
	res.json(await delete1(req.params.productId));
});

router.post("/:userId/products/:productId", async (req, res) => {
	const users = await addToInventory(req.params.userId, req.params.productId);
	res.json(users);
});

router.delete("/:userId/products/:productId", async (req, res) => {
	const users = await removeFromInventory(
		req.params.userId,
		req.params.productId
	);
	res.json(users);
});

module.exports = router;
