const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    name: String,
    interviewType: String,
    answers: [
      {
        question: String,
        answer: String
      }
    ],
    score: Number,
    percentage: Number
});

const Interview = mongoose.model("Interview", interviewSchema);

// let firstInterview = new Interview({
//     name: "Rahul",
//     interviewType: "java",
//     Score: 6,
//     difficulty: "Medium"
// });

// let newInterview = new Interview({
//         name: "Sachin",
//         interviewType: "Backend",
//         score: 6,
//         difficulty: "Easy"
//     });

// newInterview.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });


module.exports = Interview;
