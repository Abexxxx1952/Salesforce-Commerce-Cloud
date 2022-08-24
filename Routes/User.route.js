const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/User.controller");

router.get(
  "/api/v1/user/:userName/:userSurname/:userAge",
  UserController.getUser
);
router.post(
  "/api/v1/user/:email/:userName/:userSurname/:userAge",
  UserController.setUser
);
router.get("/api/v1/users/", UserController.getUsersSurnameByEmail);

module.exports = router;
