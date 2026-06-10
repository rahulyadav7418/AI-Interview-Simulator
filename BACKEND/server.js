const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Interview = require("./models/interview.js");

app.use(express.json());


main()
.then((res) => {
   console.log("Connection Succesful"); 
}).catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/AiInterviewSimulator');
}


//fetch the data
app.get("/interviews", async (req, res) => {
    const data = await Interview.find();
    res.json(data);
});

//post the data
app.post("/interviews", async (req, res) => {
    const newInterview = new Interview(req.body);
    await newInterview.save();
    res.send("Data Saved");
});

//destroy
app.delete("/interviews/:id", async (req, res) => {
    let deletedInterview = await Interview.findByIdAndDelete(req.params.id);
    console.log(deletedInterview);
    res.send("Interview deleted successfully");
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
