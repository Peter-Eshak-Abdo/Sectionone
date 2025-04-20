const express = require("express");
const mongoose = require("mongoose");
let app = express();

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

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  year: Number,
  id: Number,
});

let studentModle = new mongoose.model("students", studentSchema);

const doctorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  subject: String,
});
let doctorModle = new mongoose.model("doctors", doctorSchema);

// Create new Students
let student1 = new studentModle({
  name: "Peter",
  age: 19,
  phone: "01234567890",
  year: 2,
  id:97,
}).save();
let student2 = new studentModle({
  name: "Maher",
  age: 19,
  phone: "01234567891",
  year: 2,
  id: 284,
}).save();
let student3 = new studentModle({
  name: "John",
  age: 19,
  phone: "01234567892",
  year: 2,
  id: 124,
});

// Create new Doctors
let doctor1 = new doctorModle({
  name: "Dr. Mahmode Bakre",
  age: 29,
  phone: "01234567893",
  subject: "E-Bussiness",
}).save();
let doctor2 = new doctorModle({
  name: "Dr. Ali",
  age: 50,
  phone: "01234567894",
  subject: "Advanced Math",
}).save();
let doctor3 = new doctorModle({
  name: "Dr. Sara",
  age: 40,
  phone: "01234567895",
  subject: "ODE",
}).save();

//localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello from Tofa7a\n\nWelcome to my API\n\nYou can use the following endpoints:\n\n/students\n/doctors\n/all");
})
// Add new student to DB
app.get("/students", async (req, res) => {
  let allStudents = await studentModle({
    name: "Skrena",
    age: 19,
    phone: "01234567898",
    year: 2,
    id: 98,
  }).save();
  res.status(200);
  res.json(allStudents);
});
// GET endpoint fatch all Students from DB
//localhost:3000/users
app.get("/students", async (req, res) => {
  let allStudents = await studentModle.find();
  res.status(200);
  res.json(allStudents);
});

// GET endpoint fatch all Doctors from DB
//localhost:3000/doctors
app.get("/doctors", async (req, res) => {
  let allDoctors = await doctorModle.find();
  res.status(200);
  res.json(allDoctors);
});

app.post("/students", async (req, res) => {
  let newStudent = await student3.save();
  res.status(201);
  res.json(newStudent);
});

// app.delete("/students/:id", async (req, res) => {
//   let studentId = req.params.id;
//   let deletedStudent = await studentModle.findByIdAndDelete(studentId);
//   if (!deletedStudent) {
//     return res.status(404).json({ message: "Student not found" });
//   }
//   res.status(200).json({ message: "Student deleted successfully" });
// });

// Fatch all students and doctors from DB
// localhost:3000/all
app.get("/all", async (req, res) => {
  let allStudents = await studentModle.find();
  let allDoctors = await doctorModle.find();
  res.status(200);
  res.json({ allStudents, allDoctors });
});


app.listen(3000, () => console.log("Server now is running on port 3000"));
