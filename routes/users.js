const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");

const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken");

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;