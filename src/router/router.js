const router = require("express").Router();
const { login, dashboard } = require("../controllers/controller");
const authMiddleware = require('../middleware/auth')

// The Midis the used for the authentication, slicing it in fron of the route that are not for public access
router
.post("/login", login)
.get("/dashboard", authMiddleware ,dashboard);

module.exports = router;
