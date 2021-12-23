const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/students-api", {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopolygy: true,
  })
  .then(() => {
    console.log("Connection successfull: Connected with Mongodb");
  })
  .catch((e) => {
    console.log("Connection UnSuccessfull: Could not connect with Mongodb", e);
  });
