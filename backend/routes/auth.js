const router = require("express").Router();
const {createUser, login} = require("../controllers/users");

router.post("/singin", login);

router.post("/singup", createUser);

module.exports = router;