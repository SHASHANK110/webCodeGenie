require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const errorController = require("./controllers/error");
const path = require("path");





app.use(express.urlencoded({extended:true}))
//importing routes
const category = require('./routes/category')
const products = require('./routes/products')





//Creating fileStorage for storing files locally using multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString()+file.originalname);
  },
});
//adding filter for mimetype of multer
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//using multer for file storage locally
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//Defining front end css and js as public
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));

//Defining Routes




app.set("view engine", "ejs");
app.set("views", "views");


app.use(category)
app.use(products)

// app.get("/500", errorController.get500);
// app.use(errorController.get404);

// app.use((error, req, res, next) => {
//   res.status(500).render("500", {
//     pageTitle: "Error!",
//     path: "/500",
    
//   });
// });

mongoose
  .connect(
    `${process.env.URI}`,
   
    { user: `${process.env.UN}`, pass: `${process.env.PW}` },
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(process.env.PORT || 3100);
  })
  .catch((err) => {
    console.log(err);
  });
