const express = require("express");
const mongoose = require("mongoose");
let app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/collage");
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

let students = [
  new studentModle({
    name: "Peter",
    age: 19,
    phone: "01234567890",
    year: 2,
    id: 97,
  }),
  new studentModle({
    name: "Maher",
    age: 19,
    phone: "01234567891",
    year: 2,
    id: 284,
  }),
  new studentModle({
    name: "John",
    age: 19,
    phone: "01234567892",
    year: 2,
    id: 124,
  }),
];
// let students = [];
let doctors = [
  new doctorModle({
    name: "Dr. Mahmode Bakre",
    age: 29,
    phone: "01234567893",
    subject: "E-Bussiness",
  }),
  new doctorModle({
    name: "Dr. Ali",
    age: 50,
    phone: "01234567894",
    subject: "Advanced Math",
  }),
  new doctorModle({
    name: "Dr. Sara",
    age: 40,
    phone: "01234567895",
    subject: "ODE",
  }),
];

//localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello from Tofa7a ,Welcome to my API ,You can use the following endpoints: /students  /doctors  /all  /add-doctor  /doctors/update-name");
})

// ## GET endpoint fatch all Students from DB
//localhost:3000/students
app.get("/students", async (req, res) => {
  if (students.length === 0) {
    res.status(404).json({ message: "No students found" });
    return;
  }
  // Add a New Student (Hardcoded)
  // let newStudent = new studentModle({
  //   name: "Youssab",
  //   age: 19,
  //   phone: "01234567899",
  //   year: 2,
  //   id: 374,
  // }).save();
  res.status(200).send(students);
});

// GET endpoint fatch all Doctors from DB
//localhost:3000/doctors
app.get("/doctors", async (req, res) => {
if (doctors.length === 0) {
    res.status(404).json({ message: "No doctors found" });
    return;
  }
  let allDoctors = await doctorModle.find();
  res.status(200);
  res.json(allDoctors);
});

// ## Add a New Doctor (From Query Parameters):
// Example: /add-doctor?name=Dr.Samia&age=45&phone=123456&subject=Information%20Theory
app.get("/add-doctor", async (req, res) => {
  const { name, age, phone, subject } = req.query;
  const newDoctor = new doctorModle({ name, age, phone, subject });
  await newDoctor.save();
  res.status(201).json(newDoctor);
});

// POST endpoint to add new student to DB
//localhost:3000/students
app.post("/students", async (req, res) => {
  // ## Add a New Student (From Request Body)
  const student = req.body;
  students.push(student);
  const findStudent = students.find((i) =>i&& i.id === student.id);
  if (findStudent) {
    res.status(400).json({ message: "Student already exists" });
    return;
  }
  res.status(201).send("Student added successfully");
});

// ## Update Doctor Name
// Example: /doctors/update-name?oldName=Dr.Ali&newName=Dr.AliAhmed
app.put("/doctors/update-name", async (req, res) => {
  const { oldName, newName } = req.query;
  const updatedDoctor = await doctorModle.findOneAndUpdate(
    { name: oldName },
    { name: newName },
    { new: true }
  );
  if (!updatedDoctor) return res.status(404).json({ message: "Doctor is not found" });
  res.status(200).json(updatedDoctor);
});

// ## Delete endpoint to delete student from DB
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const findStudentIndex = students.findIndex((i)=> i.id === id);
  if (findStudentIndex === -1) {
    res.status(404).json({ message: "Student is not found" });
    return;
  }
  students.splice(findStudentIndex, 1);
  res.status(200).json({ message: `Student ${id} has been deleted successfully` });
});

// ## Fatch all students and doctors from DB
// localhost:3000/all
app.get("/all", async (req, res) => {
  let allStudents = await studentModle.find();
  let allDoctors = await doctorModle.find();
  res.status(200).json({ allStudents, allDoctors });
});

app.listen(3000, () => console.log("Server now is running on port 3000"));
