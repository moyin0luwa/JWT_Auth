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
	//first we grab the token from the auth header and assign it to a variable
	const authHeader = req.headers.authorization;
	//Then we validate the token sent
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new CustomAPIError("Invalid credentials to access this route", 401);
	}
	const token = authHeader.split(" ")[1];

	//Verifying if this token is actually valid and then decoding the token to access the info in the payload
	try {
		const decoded = jwt.verify(token, process.env.SECRET); //The token here is verified and decoded with the already set secret
		const secretNumber = Math.floor(Math.random() * 100);
		res.status(200).json({
			msg: `Shhhhhh ${decoded.username}, Want the Secret Number?`,
			secret: `Here it is, ${secretNumber}`,
		});
	} catch (error) {
		throw new CustomAPIError("Not Authorised to access this route", 401);
	}
};

module.exports = {
	login,
	dashboard,
};
