const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");

router.get("/api/user/:userName/:userSurname/:userAge", UserController.getUser);
router.post(
  "/api/user/:email/:userName/:userSurname/:userAge",
  UserController.setUser
);
router.get("/api/users/", UserController.getUsersSurnameByEmail);

module.exports = router;
