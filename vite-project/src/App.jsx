import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import { useState } from "react";
import "./App.css";
const interviews = ["Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"];
const interviewQuestions = {
  "Frontend Interview": [
    "What is React?",
    "What is JSX?",
    "What is Virtual Dom?"
  ],

  "Backend Interview": [
    "What is Node.js?",
    "What is Express.js?",
    "What is API?"
  ],

  "AI Interview": [
    "What is AI?",
    "What is Machine Learning?",
    "What is Deep Learning?"
  ],

  "Java Interview": [
    "What is OOP?",
    "What is Inheritence?",
    "What is Polimorphism?"
  ],

};

function App() {
  const [selectedInterview, setSelectedInterview] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  return (
    <div>
      <Navbar />
      <Hero />
      {
        interviews.map((item, index) => (
          <InterviewCard key = { index }
          title = { item } 
          onSelect = { setSelectedInterview }
          />
        ))
      }

      { selectedInterview && ( <h2> Selected Interview: {selectedInterview}</h2>
      )}

      {
        selectedInterview && (
          <div>
            <h3>Question:</h3>

            <p>
              { interviewQuestions [selectedInterview] [currentQuestion] }
            </p>

            {
              currentQuestion < interviewQuestions[selectedInterview].length - 1 && (
                <button onClick={() =>
                  setCurrentQuestion(currentQuestion + 1)
                }>
                  Next Question
                </button>
              )
            }
          </div>
        )
      }

    </div>
  );
}

export default App;