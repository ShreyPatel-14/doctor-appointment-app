const expr = require("express");
const app = expr();
const bp = require("body-parser");
const url = bp.urlencoded({ extended: false });

app.use(expr.static(__dirname));

const mg = require("mongoose");
mg.pluralize(null);
mg.connect("mongodb+srv://Sparse2002:shrey14112002@cluster0.tq8pkzd.mongodb.net/Form")
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const mySchema = new mg.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});
const person = new mg.model("data", mySchema);
app.post("/form-post", url, (req, res) => {
  const createDoc = async () => {
    try {
      const p1 = new person({ name: req.body.name, password: req.body.pwd });
      const result = await p1.save();
      res.write("<h1>data stored in DB</h1>");
      res.send(); 
    } catch (err) {
      console.log(err);
    }
  };
  createDoc();
});
app.listen(8000);
