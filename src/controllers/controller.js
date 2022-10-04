const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		throw new CustomAPIError("Please provide valid credentials", 400);
	}
	console.log(username, "|", password);

	//if the conditions for the username is fulfilled then we want to create our payload then sign it with the secret
	const SECRET = process.env.SECRET;
	const dateTime = new Date().getDate();
	let payload = {
		username,
		dateTime,
	};
	const token = jwt.sign(payload, SECRET, { expiresIn: 86400 });
	res.status(200).json({ msg: "User Logged in", token });
};

const dashboard = async (req, res) => {
	const secretNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Shhhhhh, Want the Secret Number`,
		secret: `Here it is ${secretNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
};
