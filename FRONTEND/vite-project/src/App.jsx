import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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

  // "AI/ML": [
  //   "What is AI?",
  //   "What is Machine Learning?",
  //   "What is Deep Learning?"
  // ],

};

function App() {
  const [started, setStarted] = useState(false);

  const [score, setScore] = useState(0);

  const [name, setName] = useState("");

  const [interviews, setInterviews] = useState([
    "Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/interviews")
    .then((res) => {
      // setInterviews(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  console.log(interviews);

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
  //console.log(selectedInterview);

  const handleSubmit = () => {
    console.log("Submit clicked");
    console.log("Current Question:", currentQuestion);

    if(submitted) return;

    if(answer.trim() === "") {
      alert("Please enter an answer!");
      return;
    }
    setSubmitted(true);
    setScore(prev => prev + 2);
    console.log("Score updating", score);
    setAnswer("");

    setTimeout(() => {
      setCurrentQuestion(prev => {
         const next = prev + 1;
         if(next >= interviewQuestions[selectedInterview].length) {
          setSubmitted(true); //or show final screen
          return prev; //stop increasing
        }
        return next;
      });

      setAnswer("");
      setSubmitted(false);
    }, 800);
  }

  const handleStartNew = () => {
    axios.post("http://localhost:8080/interviews", {
      name,
      interviewType: selectedInterview,
      score: score
                  
    }).then(() => {
      console.log("Saved Succefully");

    }).catch((err) => {
      console.log(err);
    });
    
    setName("");
    setStarted(false);
    setSelectedInterview("");
    setCurrentQuestion(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0);
  }

  return (
    <div>
      <Navbar
         showBack={started || selectedInterview}
           onBack={() => {
  if (selectedInterview) {
    setSelectedInterview("");
    setCurrentQuestion(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0); // Add this
  } else {
    setStarted(false);
    setName("");
  }
}}
      />

      <>
        <Hero
          name={name}
          setName={setName}
          started={started}
          setStarted={setStarted}
          selectedInterview={selectedInterview}
        />
      </>
      {
        started &&
        !selectedInterview &&
          interviews.map((item, index) => (
          <InterviewCard
            key={index}
            interview={item}
            onSelect={handleInterviewSelect}
          />

  ))
        // interviews.map((item, index) => (
        //   <InterviewCard key = { index }
        //   interview = { item } 
        //   onSelect = { setSelectedInterview }
        //   />
        // ))
      }

      { selectedInterview && ( <h2>{selectedInterview}</h2> )}

      {
        selectedInterview && (
          <div>
            
            <h3>Question: { currentQuestion + 1 } / { interviewQuestions[selectedInterview].length}</h3>

            <p>
            { interviewQuestions [selectedInterview] [currentQuestion] }
            </p>
            <br />
            
            {
              !(currentQuestion === interviewQuestions[selectedInterview].length - 1
                && submitted) && (
                <>
                  <input className="input" type="text"
                    placeholder="Type your answer"
                    value = { answer }
                    onChange = {(e) => setAnswer(e.target.value)} />
                  
                  <button className="submit"
                  onClick={ handleSubmit }
                  disabled={ submitted }>
                    Submit
                  </button>
            
                </>
              )
            }

            {
              currentQuestion < interviewQuestions[selectedInterview].length - 1 && (
                <button className="next" onClick={ handleNextQuestion }>
                  Skip
                </button>
              )
            }
            
            <div className="message-box">
                  {submitted && <p>Answer Submitted Successfully!</p>}
            </div>

            {
              currentQuestion === interviewQuestions[selectedInterview].length - 1
              &&
              submitted && (
                <>
                <div className="result-box"></div>
              <h3>Interview Completed!</h3>
              <h3>Name: {name} </h3>
              <p>Interview: {selectedInterview}</p>
              <br />
              <h3>Results:</h3>
              <p>Total Questions: {interviewQuestions[selectedInterview].length}</p>
              <p>Score: {score}</p>
              <p>Percentage: {" "}
                {(
                  (score / (interviewQuestions[selectedInterview].length * 2)) * 100)
                  .toFixed(0)}%
              </p>
              <button onClick={handleStartNew}
                > Start New </button>
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