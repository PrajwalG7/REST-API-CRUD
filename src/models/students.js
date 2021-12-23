const mongoose = require("mongoose");
const validator = require("validator");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email id is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//create a collection named student
const Student = new mongoose.model("Student", studentsSchema);

//export collection Student
module.exports = Student;
