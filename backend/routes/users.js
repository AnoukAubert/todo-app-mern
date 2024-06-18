const router = require("express").Router();
const User = require("../models/user");
const {getAllUsers, me, updateAvatar, getUser, createUser, updateUser} = require("../controllers/users");

router.get('/users/me', me);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

router.get("/users",getAllUsers );

router.get("/users/:id", getUser);

module.exports = router;
