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
//convert schema --> model(class)
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
    name: "roaa",
    age: 19,
    phone: "01234567891",
    year: 2,
    id: 284,
  }),
  new studentModle({
    name: "haneen",
    age: 19,
    phone: "01234567892",
    year: 2,
    id: 124,
  }),
  new studentModle({
    name: "Peter",
    age: 19,
    phone: "01234567890",
    year: 2,
    id: 97,
  }),
  new studentModle({
    name: "duha",
    age: 19,
    phone: "01234567892",
    year: 2,
    id: 124,
  }),
  new studentModle({
    name: "osama",
    age: 19,
    phone: "01234567892",
    year: 2,
    id: 124,
  }),
];
students.forEach((student) => {
  student
    .save()
    .then(() => console.log(`Saved student: ${student.name}`))
    .catch((err) => console.log("Save error:", err));
});

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
doctors.forEach((doctor) => {
  doctor
    .save()
    .then(() => console.log(`Saved doc: ${doctor.name}`))
    .catch((err) => console.log("Save error:", err));
});

//localhost:3000/
app.get("/", (req, res) => {
  res.send(
    "Hi ,Welcome to my API ,You can use the following endpoints: /students  /doctors  /all  /add-doctor  /doctors/update-name"
  );
});

// ## GET endpoint fatch all Students from DB
//localhost:3000/students
app.get("/students", async (req, res) => {
  const students = await studentModle.find();
  res.json(students);
});

// ## GET endpoint fatch all Doctors from DB
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
  const findStudent = students.find((i) => i && i.id === student.id);
  if (findStudent) {
    res.status(400).json({ message: "Student already exists" });
    return;
  }
  res.status(201).send("Student added successfully");
});

//Add a New Student (Hardcoded):
app.post("/add-student", async (req, res) => {
  let student = new stdModel({
    name: "FOLAN Alfolani",
    age: 20,
    phone: "01123456789",
    year: 3,
    id: 200,
  }).save();
  let newstd = await stdModel.find();
  res.status(201).json({
    message: "Student has been created",
    students: newstd,
  });
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
  if (!updatedDoctor)
    return res.status(404).json({ message: "Doctor is not found" });
  res.status(200).json(updatedDoctor);
});

// ## Delete endpoint to delete student from DB
app.delete("/deleteStudent", async (req, res) => {
  const { name } = req.query;
  await studentModle.deleteOne({ name });
  res.send(`Student with name "${name}" deleted.`);
});

// ## Fatch all students and doctors from DB
// localhost:3000/all
app.get("/all", async (req, res) => {
  let allStudents = await studentModle.find();
  let allDoctors = await doctorModle.find();
  res.status(200).json({ allStudents, allDoctors });
});

app.listen(3001, () => console.log("Server now is running on port 3001"));
