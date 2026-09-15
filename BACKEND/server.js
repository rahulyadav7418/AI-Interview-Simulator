require("dotenv").config();
Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Interview = require("./models/interview.js");
const cors = require("cors");
// const ollama = require("ollama").default;
const axios = require("axios");

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

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nex-agi/nex-n2.5-pro:free",
        messages: [
          {
            role: "user",
            content: `Evaluate this interview answer.

            Question: ${question}

            Answer: ${answer}

            Give a score from 0 to 10.

            Return ONLY valid JSON:
            {
                "score": 0,
                "feedback": "brief feedback"
            }`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const evaluation = response.data.choices[0].message.content;

    console.log(evaluation);

    res.json({
      evaluation: evaluation,
    });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({
      error: "AI evaluation failed",
    });
  }
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
