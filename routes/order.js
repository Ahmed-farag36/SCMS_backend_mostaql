const router = require("express").Router();
const passport = require("passport");

const {
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
} = require("../controllers/order");

// AUTHENTICATION
router.use(passport.authenticate("jwt", { session: false }));

// AUTHORIZATION
// const handleCustomerAuth = (req, res, next) => {
// 	if (req.user.role === "Customer") {
// 		next();
// 	} else {
// 		res.status(403).json({ error: "You are not allowed to access this data!" });
// 	}
// };

// const handleSupplierAuth = (req, res, next) => {
// 	if (req.user.role === "Supplier") {
// 		next();
// 	} else {
// 		res.status(403).json({ error: "You are not allowed to access this data!" });
// 	}
// };

router.get("/", async (req, res) => {
	const orders = await getAll();
	res.json(orders);
});

router.get("/:orderId", async (req, res) => {
	const order = await getOne(req.params.orderId);
	res.json(order);
});

router.get("/suppliers/:supplierId", async (req, res) => {
	const orders = await getAllForSupplier(req.params.supplierId);
	res.json(orders);
});

router.get("/customers/:customerId", async (req, res) => {
	const orders = await getAllForCustomer(req.params.customerId);
	res.json(orders);
});

router.get("/customers/:customerId/offers", async (req, res) => {
	const offers = await getAllOffersForCustomer(req.params.customerId);
	res.json(offers);
});

router.post("/customers/:customerId/inquire", async (req, res) => {
	const inquire = await sendOrderInquire(
		req.params.customerId,
		req.body.supplierId,
		req.body.products
	);
	res.json(inquire);
});

router.put("/:orderId/suppliercancel", async (req, res) => {
	res.json(await supplierCancel(req.params.orderId));
});

router.put("/:orderId/customercancel", async (req, res) => {
	res.json(await customerCancel(req.params.orderId));
});

router.put("/:orderId/offer", async (req, res) => {
	res.json(await adminOffer(req.params.orderId));
});

router.put("/:orderId/confirm", async (req, res) => {
	res.json(await customerConfirm(req.params.orderId));
});

module.exports = router;
