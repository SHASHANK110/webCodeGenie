const Product = require("../model/product");
const Category = require("../model/category");
const fileHelper = require("../util/file");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("products/products", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = async (req, res, next) => {
  let categoryNames = [];
  let category = await Category.find({}, { name: 1, _id: 0 });
  for (i = 0; i < category.length; i++) {
    categoryNames.push(category[i].name);
  }
  res.render("products/add-product", {
    pageTitle: "Add Product",
    path: "/addproduct",
    errorMessage: null,
    editing: false,
    validationErrors: [],
    hasError: false,
    categories: categoryNames,
  });
};

exports.postProduct = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const image = req.file;
  const description = req.body.description;
  const category = req.body.category;
  if (!image) {
    return res.status(422).render("products/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,

        price: price,
        description: description,
      },
      categories: category.split(" "),
      errorMessage: "File is not an image",
      validationErrors: [],
    });
  }

  const imageUrl = image.path;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    category: category,
  });
  let prodId;
  try {
    let result = await product.save();

    // product.save() .then((result) => {
    console.log(category);
    prodId = result._id;
    await Category.updateOne(
      { name: category },
      { $push: { products: prodId } }
    );
    res.redirect("/products");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  try {
    const prod = await Product.findById(prodId);

    if (!prod) {
      return next(new Error("Product not found"));
    }
    fileHelper.deleteFile(prod.imageUrl);
    Product.deleteOne({ _id: prodId }).then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/products");
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
