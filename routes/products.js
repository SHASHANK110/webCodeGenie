const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();




router.get('/products',productController.getProducts)
router.get('/addproduct',productController.getProduct)

router.post('/addproduct',productController.postProduct)
router.post("/delete-product",productController.postDeleteProduct);















module.exports = router;