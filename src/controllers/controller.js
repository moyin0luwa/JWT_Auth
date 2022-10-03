const login = async (req, res) => {
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
 