const express = require("express");

const categoryController = require("../controllers/category");

const router = express.Router();



// router.get('/',categoryController.getCategory)
router.get('/',categoryController.getAllCategory)
router.get('/addcategory',categoryController.getAddCategory)
router.post('/addcategory',categoryController.postAddCategory)
router.post('/deleteCategory',categoryController.postDeleteCategory)
router.get('/editCategory',categoryController.getEditCategory)
router.post('/editCategory',categoryController.postEditCategory)

















module.exports = router;