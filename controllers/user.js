const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["JWT"];
	}
	return token;
};

const addToInventory = (customerId, productId) => {
	return User.updateOne(
		{ _id: customerId },
		{ $addToSet: { inventory: productId } }
	);
};

const removeFromInventory = (customerId, productId) => {
	return User.updateOne(
		{ _id: customerId },
		{ $pull: { inventory: productId } }
	);
};

// LOCAL STRATEGY
// ==============
passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async function(username, password, done) {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					return done(null, false, { message: "User not found" });
				}
				const hashPassword = await bcrypt.compare(password, user.password);
				if (!hashPassword) {
					return done(null, false, { message: "Incorrect password" });
				}
				return done(null, user, {
					message: "Logged In Successfully"
				});
			} catch (error) {
				done(error, false);
			}
		}
	)
);

// JWT STRATEGY
// ============
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET
		},
		(JWTPayload, done) => {
			return done(null, JWTPayload);
		}
	)
);

const saveUser = async (username, password, email, role) => {
	try {
		await User.create({
			username,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
			email,
			role
		});
	} catch (error) {
		console.log(error);
	}
};

const findUser = async username => {
	const user = await User.findOne({ username });
	return user;
};

module.exports = {
	addToInventory,
	removeFromInventory,
	saveUser,
	findUser
};
