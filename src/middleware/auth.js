//Authentication Middleware which perfroms the functionality of authencicating a user before giving the user access to the route.
//The authentication process is basically the validating, verifying and decoding of the token sent
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

const authMiddleware = async (req,res,next) => {
    //first we grab the token from the auth header and assign it to a variable
	const authHeader = req.headers.authorization;
	//Then we validate the token sent
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Invalid credentials to access this route");
	}
	const token = authHeader.split(" ")[1];

	//Verifying if this token is actually valid and then decoding the token to access the info in the payload
	try {
		const decoded = jwt.verify(token, process.env.SECRET); //The token here is verified and decoded with the already set secret
        const { id, username } = decoded
        req.user = { id, username }
        next() //Keeps the cycle going i.e handing over to the next middleware, a controller in this case
	} catch (error) {
		throw new UnauthenticatedError("Not Authorised to access this route");
	}

}

module.exports = authMiddleware