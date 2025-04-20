const express = require("express");
const mongoose = require("mongoose");

let app = express();

// mongoose.connect("mongodb://localhost:27017/", (err) => {
//   if (!err) console.log("MongoDB connection succeeded.");
//   else console.log("Error in DB connection: " + err);
// });

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
});

let userModle = new mongoose.model("users", userSchema);

const boysSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  favfood: String,
  address: String,
});
let boysModle = new mongoose.model("boys", boysSchema);

let newUser = new userModle({
  name: "Peter",
  age: 19,
  phone: "01234567890",
}).save();

// GET endpoint fatch all users from DB
//localhost:3000/users
app.get("/users", async (req, res) => {
  let allUsers = await userModle.find();
  res.status(200);
  res.json(allUsers);
});

//localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello from Tofa7a");
})

//localhost:3000/boys
app.post("/boys", async (req, res) => {
  let newBoy = await boysModle({
    name: "Eshak",
    age: 54,
    phone: "01234567891",
    favfood: "Pizza",
    address: "Cairo",
  }).save();
  res.status(201);
  // res.json("New boys has been added to DB");
  res.json(newBoy);
});




app.listen(3000, () => console.log("Server now is running on port 3000"));
