const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		throw new CustomAPIError('Please provide valid credentials', 400)
	}
	console.log(username, "|", password);
	res.send("Fake Login route");
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
