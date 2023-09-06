const express = require("express");

const app = express();
const mg = require("mongoose");
app.use(express.json())

mg.pluralize(null);
mg.connect(
  "mongodb+srv://Sparse2002:shrey14112002@cluster0.tq8pkzd.mongodb.net/Form"
)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });


app.use('/',require('./router'))
app.listen(5000);
