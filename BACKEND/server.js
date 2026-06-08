const express = require("express");
const app = express();
const mongoose = require("mongoose");


main()
.then((res) => {
   console.log("Connection Succesful"); 
}).catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AiInterviewSimulator');
}

const interviewSchema = new mongoose.Schema({
    name: String,
    interviewType: String,
    score: Number
});

const Interview = mongoose.model("Interview", interviewSchema);

let firstInterview = new Interview({
    name: "Rahul",
    interviewType: "java",
    Score: 6
});

firstInterview.save().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});


app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
