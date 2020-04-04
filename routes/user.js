const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { saveUser, findUser } = require("../controllers/user");

// REGISTER USER
router.post("/register", async (req, res) => {
	const { username, password, confirmPassword, email, role } = req.body;
	// VALIDTAE USER CREDENTIALS
	if (!username || !password || password !== confirmPassword) {
		return res.status(400).json({ error: "Validation error" });
	}
	// SAVE USER TO DB
	await saveUser(username, password, email, role);
	// REDIRECT LOGIN
	res.json({ message: `Registered successfully` });
});

// LOGIN USER
router.post("/login", (req, res) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		console.log(err, user, info);
		if (err || !user) {
			return res.status(400).json({ error: "Login failed" });
		}

		req.login(user, { session: false }, err => {
			if (err) {
				return res.status(400).json({ error: "Login failed" });
			}
			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
					role: user.role
					// verified: user.verified,
					// createdAt: user.createdAt,
					// updatedAt: user.updatedAt
				},
				process.env.JWT_SECRET
			);

			return res
				.cookie("JWT", token /* , { sameSite: false, secure: true } */)
				.json(`logged in successfully`);
		});
	})(req, res);
});

// LOGOUT
router.get("/logout", (req, res) => {
	req.logout();
	res.clearCookie("JWT").json("logged out successfully");
});

// GET USER DATA
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const user = await findUser(req.user.username);
		res.json(user);
	}
);

module.exports = router;
