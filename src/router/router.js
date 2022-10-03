const router = require("express").Router();
const { login, dashboard } = require("../controllers/controller");

router.post("/login", login).get("/dashboard", dashboard);

module.exports = router;
