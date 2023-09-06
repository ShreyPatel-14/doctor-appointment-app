// const mongoose = require("mongoose");
// mongoose
//   .connect(
//     "mongodb+srv://Sparse2002:shrey14112002@cluster0.tq8pkzd.mongodb.net/Form"
//   )
//   .then(() => {
//     console.log("Successfully connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
// const User = mongoose.model("datas", UserSchema);
// User.createIndexes();

// const express = require("express");
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, res) => {
//   res.send("App is Working");
// });

// app.post("/login", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     const { email, password } = user;
//     email = await User.find({ email: req.body.email });
//     password = await User.find({ password: req.body.password });
//     if (!email) {
//       console.log('invalid email')
//     }
//     else if(!password) {
//         console.log('invalid password')
//     }
//     else
//     {
//         console.log('success')
//     }
//     res.send("login page");
//   } catch (e) {
//     console.log(e)
//     res.send("Hello Something Went Wrong");
//   }
// });
// app.listen(5000);
