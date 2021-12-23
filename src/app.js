const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn");
const Student = require("./models/students");
app.use(express.json());

//create new students
app.post("/students", (req, res) => {
  console.log(req.body);
  const user = new Student(req.body);
  user
    .save()
    .then(() => {
      console.log("document save");
    })
    .catch(() => {
      console.log("could not save document");
    });

  res.send("Created successfully");
});

//Read students
app.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Read specific student data using _id
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete specific student usinf _id
app.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(_id);
    if (!req.params.id) {
      return res.status(404).send();
    } else {
      res.send(deletedStudent);
      res.send(`Deleted student with id ${_id}`);
    }
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});

//update student with their _id
app.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.send(updateStudent);
  } catch (error) {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`server listening on PORT: ${port}`);
});
