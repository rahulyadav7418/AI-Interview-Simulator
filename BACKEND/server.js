const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Interview = require("./models/interview.js");
const cors = require("cors");
const ollama = require("ollama").default;

app.use(cors());
app.use(express.json());

main()
  .then((res) => {
    console.log("Connection Succesful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/AiInterviewSimulator");
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

//AI Evaluation/ by using Ollama
app.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;
  // const response = await client.responses.create({
  //   model: "gpt-5",
  //   input: `Evaluate this interview answer.

  //   Question: ${question}

  //   Answer: ${answer}

  //   Give a score out of 10 and brief feedback.`
  // });
  // console.log(response);

  const response = await ollama.chat({
    model: "qwen3:0.6b",
    think: false,
    messages: [
      {
        role: "user",
        content: `Evaluate this interview answer.

Question: ${question}

Answer: ${answer}

Give a score out of 10 and brief feedback.`,
      },
    ],
  });

  console.log(response.message.content);
});

//destroy
app.delete("/interviews/:id", async (req, res) => {
  let deletedInterview = await Interview.findByIdAndDelete(req.params.id);
  console.log(deletedInterview);
  res.send("Interview deleted successfully");
});

//Update
app.put("/interviews/:id", async (req, res) => {
  let updatedInterview = await Interview.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  res.json(updatedInterview);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
