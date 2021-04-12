const Product = require("../model/product");
const Category = require("../model/category");

exports.getAllCategory = (req, res, next) => {
  Category.find().then((categories) => {
    console.log(categories);
    res.render("category/category-list", {
      categories: categories,
      pageTitle:"Categories",
      path:"/"
    });
  });
};

exports.getAddCategory = (req, res, next) => {

  res.render("category/add-category", { errorMessage: "",path:"/addcategory",pageTitle:"Add Category" });
};

exports.postAddCategory = (req, res, next) => {
  let name = req.body.category;
  let description = req.body.description;
  if (!name) {
    return res.status(422).render("category/add-category", {
      errorMessage: "Please enter a Valid Category",
    });
  }

  let category = new Category({
    name: name,
    description: description,
    
  });
  category
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteCategory = async(req,res,next)=>{
    const categoryId = req.body.categoryId;
    try{
        const category = await Category.findByIdAndDelete(categoryId)
        res.redirect('/')
    }catch(err){
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error)
    }
}

exports.getEditCategory = async(req,res,next)=>{
  res.render("category/add-category", { errorMessage: "",path:"/addcategory",pageTitle:"Edit Category" });
}


exports.postEditCategory = async(req,res,next)=>{
  const categoryId = req.body.categoryId;
  try{
    let category = await Category.updateOne({_id:categoryId},{})
  }catch(err){
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error)
}
}