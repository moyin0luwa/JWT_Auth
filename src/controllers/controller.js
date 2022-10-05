const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		throw new CustomAPIError("Please provide valid credentials", 400);
	}
	//if the conditions for the username is fulfilled then we want to create our payload then sign it with the secret
	const SECRET = process.env.SECRET;
	const id = new Date().getDate();
	let payload = {
		username,
		id,
	};
	const token = jwt.sign(payload, SECRET, { expiresIn: 86400 });
	res.status(200).json({ msg: "User Logged in", token });
};

const dashboard = async (req, res) => {
	const { username } = req.user
	const secretNumber = Math.floor(Math.random() * 100);
		res.status(200).json({
			msg: `Shhhhhh ${username}, Want the Secret Number?`,
			secret: `Here it is, ${secretNumber}`,
		});
};

module.exports = {
	login,
	dashboard,
};
