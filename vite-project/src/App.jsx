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
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleNextQuestion = () => {
    if(currentQuestion < interviewQuestions[selectedInterview].length - 1)
    {
    setCurrentQuestion(prev => prev + 1);
    setAnswer("");
    setSubmitted(false);
    }
  };

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
            
            <h3>Question: { currentQuestion + 1 } / { interviewQuestions[selectedInterview].length}</h3>

            <p>
            { interviewQuestions [selectedInterview] [currentQuestion] }
            </p>
            <br />
            
            <input className="input" type="text"
              placeholder="Type your answer"
              value = { answer }
              onChange = {(e) => setAnswer(e.target.value)} />

            <button className="submit" onClick={() => {
              if(answer.trim() === "") {
                alert("Please enter an answer!");
                return;
              }
              setSubmitted(true);
              setAnswer("");
            }}
              >Submit</button>
            
            {
              submitted && <p className="submitted">Answer Submitted Succesfully!</p>
            }

            {
              currentQuestion < interviewQuestions[selectedInterview].length - 1 && (
                <button className="next" onClick={ handleNextQuestion }>
                  Next
                </button>
              )
            }

            {
              currentQuestion === interviewQuestions[selectedInterview].length - 1
              &&
              submitted && (
                <>
              <h3>Interview Completed!</h3>

              <button onClick={() => {
              setSelectedInterview("");
              setCurrentQuestion(0);
              setAnswer("");
              setSubmitted(false);
              }}>
              Start New
              </button>
              </>
              )
            }
            
             
          </div>
        )
      }

    </div>
  );
}

export default App;