const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

const PORT = 2000;
const mongoUrl = "mongodb://localhost:27017/projectDB";

const jobSchema = new mongoose.Schema({
  nameofJob: String,
  jobType: String,
  nameofCompany: String,
  Location: String,
  description: String,
  salary: String,
  jobShift: String,
  category: String,
});

const employeeSchema = new mongoose.Schema({
  employeeName: String,
  Email: String,
  password: String,
  phoneNum: String,
});

const EmployerSchema = new mongoose.Schema({
  companyName: String,
  companyEmail: String,
  companyPassword: String,
  companyPhone: String,
});

const Job = mongoose.model("Job", jobSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Employer = mongoose.model("Employer", EmployerSchema);

app.get("/", (req, res) => {
  res.send("up and Running ");
});

// Job det post put delete
app.get("/get-jobs", async (req, res) => {
  const allJobs = await Job.find();
  return res.json(allJobs);
});

app.post("/add-jobs", async (req, res) => {
  const jobData = req.body;
  const job = await Job.create(jobData);
  return res.json(job);
});

app.get("/get-jobs/:id", async (req, res) => {
  const id = req.params.id;
  const job = await Job.findById(id);
  return res.json(job);
});

app.delete("/delete-jobs/:id", async (req, res) => {
  const id = req.params.id;
  await Job.findByIdAndDelete(id);
  return res.send("Job Deleted");
});

app.put("/update-job/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;

  const updateJob = await Job.findByIdAndUpdate(id, jobData, {
    new: true,
  });
  return res.json(updateJob);
});

// Employee get post put delete

app.get("/get-employee", async (req, res) => {
  const allEmployee = await Employee.find();
  return res.json(allEmployee);
});

app.post("/add-employee", async (req, res) => {
  const employeeData = req.body;
  const employee = await Employee.create(employeeData);
  return res.json(employee);
});

app.get("/get-employee/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findById(id);
  return res.json(employee);
});

app.delete("/delete-employee/:id", async (req, res) => {
  const id = req.params.id;
  await Employee.findByIdAndDelete(id);
  return res.send("Applicant Deleted");
});

app.put("/update-employee/:id", async (req, res) => {
  const id = req.params.id;
  const employeeData = req.body;

  const updateEmployee = await Employee.findByIdAndUpdate(id, employeeData, {
    new: true,
  });
  return res.json(updateEmployee);
});

//end

//for Employer

app.get("/get-employer", async (req, res) => {
  const allEmployers = await Employer.find();
  return res.json(allEmployers);
});

app.post("/add-employer", async (req, res) => {
  const employerData = req.body;
  const employer = await Employer.create(employerData);
  return res.json(employer);
});

app.get("/get-employer/:id", async (req, res) => {
  const id = req.params.id;
  const employer = await Employer.findById(id);
  return res.json(employer);
});

app.delete("/delete-employer/:id", async (req, res) => {
  const id = req.params.id;
  await Employer.findByIdAndDelete(id);
  return res.send("Employer Deleted");
});

app.put("/update-employer/:id", async (req, res) => {
  const id = req.params.id;
  const employerData = req.body;

  const updateEmployer = await Job.findByIdAndUpdate(id, employerData, {
    new: true,
  });
  return res.json(updateEmployer);
});

//emloyer ends here

const start = () => {
  mongoose.connect(mongoUrl, (errr) => {
    if (errr) {
      return console.log("Failed to Connect to MongoDB");
    }
    console.log("Connected to MongoDB");
  });
};

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

start();
