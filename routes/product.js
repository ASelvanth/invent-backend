const express = require('express');
const {getProducts, createProduct, updateProduct, deleteProduct, getProduct} =  require("../controllers/product")

const {verifyToken, verifyUser, verifyAdmin} = require("../utils/verifyToken");
const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createProduct);
//UPDATE
router.put("/:id", verifyAdmin, updateProduct);
//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);
//GET
router.get("/find/:id", getProduct);
//GET ALL
router.get("/", getProducts);

module.exports = router;
